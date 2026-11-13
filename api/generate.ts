import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY})


export async function POST(request: Request) {
    const { goal, level, daysPerWeek, equipment } = await request.json();

    const prompt = `Create a weekly workout plan for a ${level} person whose goal is ${goal}. The person will train ${daysPerWeek} days per week and has the following equipment: ${equipment}`

    const response = await ai.models.generateContent({
        model: "gemini-flash-lite-latest",
        contents: prompt,
    })

    return Response.json({ text: response.text})
    
}