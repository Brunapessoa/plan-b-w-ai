import type { WorkoutPlan } from "../types";

type WorkoutPlanDisplayProps = {
    plan: WorkoutPlan
}

function WorkoutPlanDisplay({ plan }: WorkoutPlanDisplayProps) {
    return (
        <section className="mt-5 mb-10 px-6">
            {plan.workouts.map((workout) => (
                <div className="my-15" key={workout.name}
                >
                    <h2 className="text-zinc-100 text-lg font-bold py-2">{workout.name}</h2>
                    <table className="w-full text-center text-zinc-100 border border-zinc-600 border-collapse">
                        <thead className="bg-zinc-700">
                            <tr>
                                <th className="py-1 px-2">Exercise</th>
                                <th className="py-1 px-2">Weights</th>
                                <th className="py-1 px-2">Reps</th>
                            </tr>
                        </thead>
                        <tbody>
                        {workout.exercises.map((exercise) => (
                            <tr className="even:bg-zinc-800" key={exercise.exercise}>
                                <td className="py-1 px-2">{exercise.exercise}</td>
                                <td className="py-1 px-2">{exercise.weights}</td>
                                <td className="py-1 px-2">{exercise.reps}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </section>
    )
} 

export default WorkoutPlanDisplay;