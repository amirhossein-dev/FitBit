export interface IExercise {
  id: string;
  name: string;
  duration: number;
  calories: number;
  date?: Date;
  state?: 'به اتمام رسیده' | 'تمام نشده' | null;
}
