import { HumanMessage } from "@langchain/core/messages"
import { getModel } from "../config/llmModels.js"

export const router = async (state) => {
    const llm = await getModel ("router")
    const prompt = `You are an agent router.
    
    Available agents:

    -chat
    -search
    -coding
    -pdf
    -ppt
    -vision

    Rules:

    chat:
    General conversation,
    explanations,
    learning,
    questions.

    search:
    current events,
    latest information,
    news,
    recent development,
    internet lookup.

    coding:
    General code,
    debug code,
    build projects,
    architecture,
    API design.

    pdf:
    Questions about generate PDFs
    or document context.

    ppt:
    Questions about generate ppts
    or ppt context

    vision:
    Generate image,
    create image.


    Return ONLY one word:
    
    chat
    search
    coding
    pdf
    ppt
    vision
    
    User Query:
    ${state.prompt}
    
    `

    const response = await llm.generate([[new HumanMessage(prompt)]])
    const selectedAgent = response.generations?.[0]?.[0]?.message?.content ?? "chat"
    console.log(selectedAgent)
    return{
        ...state,
        agent:selectedAgent
            .trim()
            .toLowerCase()
    }
}