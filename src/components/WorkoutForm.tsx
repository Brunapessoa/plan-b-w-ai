import { useState } from "react";
import type { WorkoutFormData, Level } from "../types";

function WorkoutForm() {

    const levels: Level[] = ["beginner", "intermediate", "advanced"]

    const [formData, setFormData] = useState<WorkoutFormData>({
        goal: "build muscle",
        level: "advanced",
        daysPerWeek: 2,
        equipment: "bodyweight only",
    });

    return(
        <form className="text-amber-50">    
        <fieldset>
            <legend className="px-10 py-5">Level</legend>
            {levels.map((level) => (
                <label className="py-5 px-10" key={level} >
                    <input 
                        type="radio" 
                        name="level"
                        value={level}
                        checked={formData.level === level}
                        onChange={() => setFormData({...formData, level: level})}
                        />
                    {level}
                    
                </label>
            ))}
        </fieldset>
        <button className="bg-mauve-500 mt-10 mx-auto px-2 py-2 rounded-md" type="submit">Generate Workout</button>
        </form>
    )
}
export default WorkoutForm;

