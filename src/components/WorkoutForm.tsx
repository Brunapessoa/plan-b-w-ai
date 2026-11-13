import { useState } from "react";
import type { WorkoutFormData, Goal, Level, DaysPerWeek,Equipment } from "../types";

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

    return(
        <form className="text-amber-50 my-10 pb-20">    
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
                        onChange={() => setFormData({...formData, equipment: equipmentOption})}
                        />
                        {equipmentOption}
                    </label>
                ))}
        </fieldset>
        <button className="bg-mauve-500 mt-10 px-2 py-2 rounded-md" type="submit">Generate Workout</button>
        </form>
    )
}
export default WorkoutForm;

