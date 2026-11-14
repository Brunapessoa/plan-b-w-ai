import { useState,  } from "react";
import type { WorkoutFormData, Goal, Level, DaysPerWeek, Equipment, WorkoutPlan } from "../types";
import WorkoutPlanDisplay from "./WorkoutPlanDisplay";
import type { SubmitEvent } from "react";

function WorkoutForm() {

    const goals: Goal[] = ["lose weight", "build muscle", "endurance", "general fitness"]

    const levels: Level[] = ["beginner", "intermediate", "advanced"]

    const daysPerWeek: DaysPerWeek[] = [2, 3, 4, 5, 6]

    const equipments: Equipment[] = ["bodyweight only", "dumbbells", "full gym"];

    const [formData, setFormData] = useState<WorkoutFormData>({
        goal: "lose weight",
        level: "beginner",
        daysPerWeek: 2,
        equipment: "bodyweight only",
    });

    const [plan, setPlan] = useState<WorkoutPlan | null>(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()

        setLoading(true)
        setError("")

        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify(formData),
            })
            
            if (!response.ok) {
                throw new Error()
            }
            
            const data = await response.json()
            setPlan(data);
        }
        catch {
            setError("Something went wrong. Please try again.")
            } finally {
                setLoading(false)
            }          
        } 
        
    if(plan) {
        return ( 
            <>
                <button className="my-2 bg-mauve-500 py-1 px-2 rounded-md text-amber-50"
                type="button"
                onClick={() => setPlan(null)}>
                    Back to Form
                </button>
                <WorkoutPlanDisplay plan={plan} />
            </>
        )
    }
    return(
        <form className="text-amber-50 my-10 pb-20"
        onSubmit={handleSubmit}>  
            
            {loading && (              
                <div className="fixed inset-0 flex items-start bg-black/30 font-bold">
                    <p className="w-full text-center text-2xl text-amber-50 bolder mt-60">
                        Generating your workout...
                    </p>
                </div>
            )}

            {error && (
                <div className="flex flex-col bg-black/80 fixed inset-0 items-center justify-center my-80 mx-40 rounded-2xl">
                    <p className=" text-center text-2xl text-amber-50 font-bold">{error}</p>
                    <button className="mt-4 bg-mauve-500 px-4 py-2 rounded-md text-amber-50"
                    type="button"
                    onClick={() => setError("")}
                    >Try again
                    </button>
                </div>
            )}

            <fieldset className="px-8 py-8 border-2 border-solid rounded-md my-10">
                <legend className="px-4">Goal</legend>
                {goals.map((goalOption) => (
                    <label className="px-5" key={goalOption}>
                        <input className="accent-orange-400 mx-2" 
                            type="radio"
                            name="goal"
                            value={goalOption}
                            checked={formData.goal === goalOption}
                            onChange={() => setFormData({...formData, goal: goalOption})}
                            />
                        {goalOption}
                    </label>
                    ))}
            </fieldset>
            <fieldset className="px-8 py-8 border-2 border-solid rounded-md my-10">
                <legend className="px-4">Level</legend>
                {levels.map((levelOption) => (
                    <label className="px-5" key={levelOption} >
                    <input className="accent-orange-400 mx-2"
                            type="radio" 
                            name="level"
                            value={levelOption}
                            checked={formData.level === levelOption}
                            onChange={() => setFormData({...formData, level: levelOption})}
                            />
                    {levelOption}
                </label>
                ))}
            </fieldset>
            <fieldset className="px-8 py-8 border-2 border-solid rounded-md my-10">
                <legend className="px-4">Days per Week</legend>
                    {daysPerWeek.map((daysOption) => (
                        <label className="px-5" key={daysOption}>
                        <input className="accent-orange-400 mx-2"
                        type="radio"
                        name="daysPerWeek"
                        value={daysOption}
                        checked={formData.daysPerWeek === daysOption}
                        onChange={() => setFormData({...formData, daysPerWeek: daysOption})} 
                        />
                        {daysOption}
                    </label>
                    ))}
            </fieldset>
            <fieldset className="px-8 py-8 border-2 border-solid rounded-md my-10">
                <legend className="px-4">Equipment</legend>
                    {equipments.map((equipmentOption) => (
                        <label className="px-5" key={equipmentOption}>
                            <input className="accent-orange-400 mx-2"
                            type="radio" 
                            name="equipment"
                            value={equipmentOption}
                            checked={formData.equipment === equipmentOption}
                            onChange={() => setFormData({...formData, equipment:    equipmentOption})}
                            />
                            {equipmentOption}
                        </label>
                    ))}
            </fieldset>
            <button className="bg-mauve-500 my-5 px-2 py-2 rounded-md" 
            type="submit"
            disabled={loading}
            >Generate Workout
            </button>
        </form>
    )
}
export default WorkoutForm;

