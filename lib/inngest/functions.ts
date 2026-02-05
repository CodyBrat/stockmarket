import { inngest } from "@/lib/inngest/client";
import {
  PERSONALIZED_WELCOME_EMAIL_PROMPT,
  NEWS_SUMMARY_EMAIL_PROMPT,
} from "@/lib/inngest/prompts";

import {
  sendWelcomeEmail,
  sendNewsSummaryEmail,
} from "@/lib/nodemailer";

import { getAllUsersForNewsEmail } from "@/lib/actions/user.actions";
import { getWatchlistSymbolsByEmail } from "@/lib/actions/watchlist.actions";
import { getNews } from "@/lib/actions/finnhub.actions";

import { formatDateToday} from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface UserForNewsEmail {
  id: string;
  email: string;
  name: string;
}

/* -------------------------------------------------------------------------- */
/*                               SIGN-UP EMAIL                                */
/* -------------------------------------------------------------------------- */

export const sendSignUpEmail = inngest.createFunction(
  { id: "sign-up-email" },
  { event: "app/user.signed.up" },
  async ({ event }) => {
    const { email, name } = event.data;

    const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT
      .replace("{{name}}", name ?? "there");

    await sendWelcomeEmail({
      email,
      name: name ?? "User",
      intro: prompt,
    });

    return { success: true };
  }
);

/* -------------------------------------------------------------------------- */
/*                           DAILY NEWS SUMMARY EMAIL                          */
/* -------------------------------------------------------------------------- */

export const sendDailyNewsSummary = inngest.createFunction(
  { id: "daily-news-summary" },
  [
    { event: "app/send.daily.news" },
    { cron: "0 12 * * *" },
  ],
  async ({ step }) => {
    /* ----------------------- Step 1: Get all users ----------------------- */
    const users = await step.run(
      "get-all-users",
      async () => await getAllUsersForNewsEmail()
    ) as UserForNewsEmail[];

    if (!users || users.length === 0) {
      return {
        success: false,
        message: "No users found for news email",
      };
    }

    /* -------- Step 2: Fetch watchlist news (fallback to general) -------- */
    const results = await step.run("fetch-user-news", async () => {
      const perUser: Array<{
        user: UserForNewsEmail;
        articles: RawNewsArticle[];
      }> = [];

      for (const user of users) {
        try {
          const symbols = await getWatchlistSymbolsByEmail(user.email);

          let articles = await getNews(symbols);
          articles = (articles || []).slice(0, 6);

          if (!articles.length) {
            articles = await getNews();
            articles = (articles || []).slice(0, 6);
          }

          perUser.push({ user, articles });
        } catch (error) {
          console.error(
            "daily-news: error preparing user news",
            user.email,
            error
          );

          perUser.push({ user, articles: [] });
        }
      }

      return perUser;
    });

    /* ------------------ Step 3: Summarize news via AI ------------------ */
    const userNewsSummaries: {
      user: UserForNewsEmail;
      newsContent: string | null;
    }[] = [];

    for (const { user, articles } of results) {
      try {
        const prompt = NEWS_SUMMARY_EMAIL_PROMPT.replace(
          "{{newsData}}",
          JSON.stringify(articles, null, 2)
        );

        const response = await step.ai.infer(
          `summarize-news-${user.email}`,
          {
            model: step.ai.models.gemini({
              model: "gemini-2.5-flash-lite",
            }),
            body: {
              contents: [
                {
                  role: "user",
                  parts: [{ text: prompt }],
                },
              ],
            },
          }
        );

        const part =
          response.candidates?.[0]?.content?.parts?.[0];

        const newsContent =
          (part && "text" in part ? part.text : null) ??
          "No market news.";

        userNewsSummaries.push({ user, newsContent });
      } catch (error) {
        console.error(
          "Failed to summarize news for:",
          user.email,
          error
        );

        userNewsSummaries.push({ user, newsContent: null });
      }
    }

    /* ----------------------- Step 4: Send emails ----------------------- */
    await step.run("send-news-emails", async () => {
      await Promise.all(
        userNewsSummaries.map(async ({ user, newsContent }) => {
          if (!newsContent) return false;

          return sendNewsSummaryEmail({
            email: user.email,
            date: formatDateToday,
            newsContent,
          });
        })
      );
    });

    return {
      success: true,
      message: "Daily news summary emails sent successfully",
    };
  }
);
