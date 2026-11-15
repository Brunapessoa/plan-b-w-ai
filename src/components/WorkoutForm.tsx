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
            
            const data = await response.json()
            
            if(!response.ok) {
                setError(data.error)
                return
            }
    
            setPlan(data)
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
                <button className="block mx-auto bg-zinc-500 border boder-2 border-zinc-700 px-6 py-3 rounded-md hover:bg-zinc-700 active:bg-zinc-700 cursor-pointer text-zinc-200 my-8"
                type="button"
                onClick={() => setPlan(null)}>
                    Back to Form
                </button>
                <WorkoutPlanDisplay plan={plan} />
            </>
        )
    }
    return(
        <form className="text-zinc-200 my-10 pb-10"
        onSubmit={handleSubmit}>  
            
            {loading && (              
                <div className="fixed inset-0 flex items-center justify-center bg-white/30 font-bold">
                    <p className="w-full max-w-sm py-10 text-center text-2xl bg-black/80 text-zinc-100 font-bold rounded-2xl">
                        Generating your workout...
                    </p>
                </div>
            )}

            {error && (
                <div className="fixed inset-0 flex items-center justify-center px-5 bg-white/30">
                    <div className="w-full max-w-sm py-10 px-6 flex flex-col items-center gap-6 bg-black/80 rounded-2xl">
                        <p className=" text-center text-2xl text-amber-50 font-bold">{error}</p>
                        <button className="block mx-auto bg-zinc-500 border-2 border-zinc-700 px-6 py-3 rounded-md hover:bg-zinc-700 active:bg-zinc-700 cursor-pointer"
                        type="button"
                        onClick={() => setError("")}
                        >Try again
                        </button>
                    </div>
                </div>
            )}

            <fieldset className="px-8 py-8 border-2 border-solid border-zinc-600 rounded-md my-10 mx-5">
                <legend className="px-4">Goal</legend>
                    <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:gap-x-8">
                        {goals.map((goalOption) => (
                            <label className="flex items-center gap-2" key={goalOption}>
                                <input className="accent-orange-400" 
                                    type="radio"
                                    name="goal"
                                    value={goalOption}
                                    checked={formData.goal === goalOption}
                                    onChange={() => setFormData({...formData, goal: goalOption})}
                                    />
                                {goalOption}
                            </label>
                            ))}
                    </div>
            </fieldset>
            <fieldset className="px-8 py-8 border-2 border-solid border-zinc-600 rounded-md my-10 mx-5">
                <legend className="px-4">Level</legend>
                <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:gap-x-8">
                {levels.map((levelOption) => (
                    <label className="flex items-center gap-2" key={levelOption} >
                    <input className="accent-orange-400"
                            type="radio" 
                            name="level"
                            value={levelOption}
                            checked={formData.level === levelOption}
                            onChange={() => setFormData({...formData, level: levelOption})}
                            />
                    {levelOption}
                </label>
                ))}
                </div>
            </fieldset>
            <fieldset className="px-8 py-8 border-2 border-solid border-zinc-600 rounded-md my-10 mx-5">
                <legend className="px-4">Days per Week</legend>
                    <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:gap-x-8">
                    {daysPerWeek.map((daysOption) => (
                        <label className="flex items-center gap-2" key={daysOption}>
                        <input className="accent-orange-400"
                        type="radio"
                        name="daysPerWeek"
                        value={daysOption}
                        checked={formData.daysPerWeek === daysOption}
                        onChange={() => setFormData({...formData, daysPerWeek: daysOption})} 
                        />
                        {daysOption}
                    </label>
                    ))}
                    </div>
            </fieldset>
            <fieldset className="px-8 py-8 border-2 border-solid border-zinc-600 rounded-md my-10 mx-5">
                <legend className="px-4">Equipment</legend>
                    <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:gap-x-8">
                    {equipments.map((equipmentOption) => (
                        <label className="flex items-center gap-2" key={equipmentOption}>
                            <input className="accent-orange-400"
                            type="radio" 
                            name="equipment"
                            value={equipmentOption}
                            checked={formData.equipment === equipmentOption}
                            onChange={() => setFormData({...formData, equipment:    equipmentOption})}
                            />
                            {equipmentOption}
                        </label>
                    ))}
                    </div>
            </fieldset>
            <button className="block mx-auto bg-zinc-500 border boder-2 border-zinc-700 px-6 py-3 rounded-md hover:bg-zinc-700 active:bg-zinc-700 cursor-pointer" 
            type="submit"
            disabled={loading}
            >Generate Workout
            </button>
        </form>
    )
}
export default WorkoutForm;

