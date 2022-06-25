import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface State {
  isLoading: boolean;
  isAuthenticated: boolean;
  uid: string;
}

const initialState: State = {
  isLoading: false,
  isAuthenticated: false,
  uid: 'default',
};

export const AuthReducer = createReducer(
  initialState,
  on(AuthActions.startLoading, (state) => ({ ...state, isLoading: true })),
  on(AuthActions.stopLoading, (state) => ({ ...state, isLoading: false })),
  on(AuthActions.setAuthenticated, (state) => ({
    ...state,
    isAuthenticated: true,
  })),
  on(AuthActions.setUnauthenticated, (state) => ({
    ...state,
    isAuthenticated: false,
  })),
  on(AuthActions.setUid, (state, { payload }) => ({ ...state, uid: payload }))
);
