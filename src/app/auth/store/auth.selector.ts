import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromAuth from './auth.reducer';

const getState = createFeatureSelector<fromAuth.State>('auth');

export const SelectAuth = createSelector(
  getState,
  (state: fromAuth.State) => state
);

export const SelectAuthIsLoading = createSelector(
  getState,
  (state: fromAuth.State) => state.isLoading
);
export const isAuthenticated = createSelector(
  getState,
  (state: fromAuth.State) => state.isAuthenticated
);
