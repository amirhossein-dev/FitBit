import { createReducer, on, props } from '@ngrx/store';

import { IExercise } from '../exercise.interface';
import * as trainingActions from './traning.actions';
import * as fromApp from '../../store/app.state';
import { Action } from 'rxjs/internal/scheduler/Action';

export interface ITrainingState {
  availableExercises: IExercise[];
  finishedExercises: IExercise[];
  activeTraining: IExercise;
}

export interface State extends fromApp.AppState {
  training: ITrainingState;
}

const initialState: ITrainingState = {
  availableExercises: [],
  finishedExercises: [],
  activeTraining: null,
};

export const TrainingReducer = createReducer(
  initialState,
  on(trainingActions.setAvailableTrainings, (state, { payload }) => ({
    ...state,
    availableExercises: payload,
  })),
  on(trainingActions.setFinishedTrainings, (state, { payload }) => ({
    ...state,
    finishedExercises: payload,
  })),
  on(trainingActions.startTraining, (state, { payload }) => ({
    ...state,
    activeTraining: {
      ...state.availableExercises.find((ex) => ex.id === payload),
    },
  })),
  on(trainingActions.stopTraining, (state) => ({
    ...state,
    activeTraining: null,
  }))
);
