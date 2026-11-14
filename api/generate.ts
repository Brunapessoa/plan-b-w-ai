import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY})


export async function POST(request: Request) {
    const { goal, level, daysPerWeek, equipment } = await request.json();

    const prompt = `Create a weekly workout plan.
    
    Person: 
    - Level: ${level} 
    - Goal: ${goal} 
    - Equipment: ${equipment}
    
    Rules: 
    - Create exactly ${daysPerWeek} workouts.
    - Give each workout a short descriptive name, like "Upper body" or "Full body A".
    - In "exercise", write the exercise name. When useful, add details after " - ", like rest time, duration or intensity. Example: "Plank - duration 60 sec, rest 90 sec".
    - In "weights", suggest a starting weight in kg. Leave the field empty for bodyweight exercises.
    - In "reps", use the format "sets x reps", like "3x12".`

    const response = await ai.models.generateContent({
        model: "gemini-flash-lite-latest",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseJsonSchema: {
                type: "object",
                properties: {
                    workouts: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                name: { type: "string" },
                                exercises: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            exercise: { type: "string" },
                                            weights: { type: "string" },
                                            reps: { type: "string" },
                                        },
                                        required: ["exercise", "weights", "reps"],
                                    },
                                },
                            },
                            required: ["name", "exercises"],
                        },
                    },
                },
                required: ["workouts"],
            },
        },
    })

    const plan = JSON.parse(response.text ?? "")
    
    return Response.json(plan)
    
}