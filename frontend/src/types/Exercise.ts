export interface GymExercise {
  id?: number;
  name: string;
  muscleGroup: string;
  weights: number;
  sets: number;
  reps: number;
  dayOfWeek: string;
}

export interface ExerciseFormData {
  name: string;
  muscleGroup: string;
  weights: number;
  sets: number;
  reps: number;
  dayOfWeek: string;
}