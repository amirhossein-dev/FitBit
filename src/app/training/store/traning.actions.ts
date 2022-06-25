import { createAction, props } from '@ngrx/store';
import { IExercise } from '../exercise.interface';

export const setAvailableTrainings = createAction(
  '[Training] Set Available Taraings',
  props<{ payload: IExercise[] }>()
);
export const setFinishedTrainings = createAction(
  '[Training] Set Finished Trainings',
  props<{ payload: IExercise[] }>()
);
export const startTraining = createAction(
  '[Training] Start Training',
  props<{ payload: string }>()
);
export const stopTraining = createAction('[Training] Stop Training');
