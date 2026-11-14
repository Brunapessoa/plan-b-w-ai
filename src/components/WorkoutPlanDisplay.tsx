import type { WorkoutPlan } from "../types";

type WorkoutPlanDisplayProps = {
    plan: WorkoutPlan
}

function WorkoutPlanDisplay({ plan }: WorkoutPlanDisplayProps) {
    return (
        <section className="border-2 border-amber-50 mt-2 mb-10 p-2">
            {plan.workouts.map((workout) => (
                <div className="my-5" key={workout.name}
                >
                    <h2 className="text-amber-100">{workout.name}</h2>
                    <ul className="text-amber-50">
                        {workout.exercises.map((exercise) => (
                            <li className="border text-center py-2" key={exercise.exercise}>
                                {exercise.exercise} | {exercise.weights} | {exercise.reps}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </section>
    )
} 

export default WorkoutPlanDisplay;