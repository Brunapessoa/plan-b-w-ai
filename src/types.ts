export type Goal = "build muscle" | "lose weight" | "endurance" | "general fitness";
export type Level = "beginner" | "intermediate" | "advanced";
export type DaysPerWeek = 2 | 3 | 4 | 5 | 6;
export type Equipment = "bodyweight only" | "dumbbells" | "full gym";

export type WorkoutFormData = {
    goal: Goal;
    level: Level;
    daysPerWeek: DaysPerWeek;
    equipment: Equipment;
}