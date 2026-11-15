import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY})

const goals = ["lose weight", "build muscle", "endurance", "general fitness"]
const levels = ["beginner", "intermediate", "advanced"]
const daysOptions = [ 2, 3, 4, 5, 6]
const equipmentOptions = ["bodyweight only", "dumbbells", "full gym"]

export async function POST(request: Request) {
    const { goal, level, daysPerWeek, equipment } = await request.json();

    if(
    !goals.includes(goal) ||
    !levels.includes(level) ||
    !daysOptions.includes(daysPerWeek) ||
    !equipmentOptions.includes(equipment)
    ) {
        return Response.json({ error: "Invalid form data" }, { status: 400 })
    }

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

    try {
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

    } catch (error) {
        console.log(error)
        return Response.json(
            { error: "The AI is busy now. Please try again in a moment."},
            { status: 503 }
        )
    } 
}