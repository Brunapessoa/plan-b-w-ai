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
        <form>    
        <fieldset>
            <legend>Level</legend>

            {levels.map((level) => (
                <label key={level}>
                    <input 
                        type="radio" 
                        name="level"
                        value={level}
                        checked={formData.level === level}
                        onChange={() => setFormData({...formData, level: level})}
                        />
                </label>
            ))}
        </fieldset>
        <button type="submit">Generate Workout</button>
        </form>
    )
}
export default WorkoutForm;

