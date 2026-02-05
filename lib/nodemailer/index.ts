import nodemailer from 'nodemailer';
import { NEWS_SUMMARY_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from './templates';
import { NEWS_SUMMARY_EMAIL_PROMPT } from '../inngest/prompts';
export const transporter= nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.NODEMAILER_EMAIL!,
        pass:process.env.NODEMAILER_PASSWORD!
    }
})
export const sendWelcomeEmail=async({email,name,intro}:WelcomeEmailData)=>{
    const htmlTemplate=WELCOME_EMAIL_TEMPLATE
    .replace('{{name}}',name)
    .replace('{{intro}}',intro);
    const mailOptions={
        from : `"Predicta" <predicta@gmail.com>`,
        to:email,
        subject:'Welcome to Predicta!',
        text: 'Thanks for joining Predicta. We are excited to have you on board!',
        html:htmlTemplate
    };
    await transporter.sendMail(mailOptions);

}

export const sendNewsSummaryEmail= async(
    {email,date,newsContent}:{email:string;date:string;newsContent:string}
): Promise<void>=>{
    const htmlTemplate=NEWS_SUMMARY_EMAIL_TEMPLATE
    .replace('{{date}}',date)
    .replace('{{newsContent}}',newsContent);
    const mailOptions={
        from: `"Predicta News" <priyabratasingh@gmail.com>`,
        to:email,
        subject:`Your Daily News Summary for ${date}`,
        text:`Here is your news summary for ${date}:\n\n${newsContent}`,
        html:htmlTemplate
    };
    await transporter.sendMail(mailOptions);
}


