import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '../auth/store/auth.reducer';

export interface AppState {
  auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState, any> = {
  auth: fromAuth.AuthReducer,
};
