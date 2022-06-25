import { createAction, props } from '@ngrx/store';

export const startLoading = createAction('[Auth] Start Loading');
export const stopLoading = createAction('[Auth] Stop Loading');
export const setAuthenticated = createAction('[Auth] Set  Authenticated');
export const setUnauthenticated = createAction('[Auth] Set Unauthenticated');
export const setUid = createAction(
  '[Auth] Set Uid',
  props<{ payload: string }>()
);
