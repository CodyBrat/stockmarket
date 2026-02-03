import { inngest } from "@/lib/inngest/client";

export const sendSignUpEmail=inngest.createFunction(
    {id:'sign-up-email'},
    {event:'app/user.created'},
    async({event, step})=>{
        const userProfile=`
        - Country: ${event.data.country}
        - Ivestment goals: ${event.data.investmentGoals}
        - Risk tolerance: ${event.data.riskTolerance}
        - Preferred industries: ${event.data.preferredIndustries}
        `
    }
)