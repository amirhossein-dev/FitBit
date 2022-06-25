import { createSelector } from '@ngrx/store';
import * as fromTraining from './training.reducer';

const getState = (state: fromTraining.State) => state.training;

export const getAvailableExercises = createSelector(
  getState,
  (state: fromTraining.ITrainingState) => state.availableExercises
);

export const getFinishedExercises = createSelector(
  getState,
  (state: fromTraining.ITrainingState) => state.finishedExercises
);

export const getActiveTrainings = createSelector(
  getState,
  (state: fromTraining.ITrainingState) => state.activeTraining
);

export const getIsTraining = createSelector(
  getState,
  (state: fromTraining.ITrainingState) => state.activeTraining != null
);
