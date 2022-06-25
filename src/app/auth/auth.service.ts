import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import { IAuthData } from './auth-data.interface';
import { TrainingService } from '../training/training.service';
import { UiService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as AuthActions from './store/auth.actions';
import * as fromApp from '../store/app.state';
import * as authSelector from './store/auth.selector';

@Injectable()
export class AuthService {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private traningService: TrainingService,
    private uiService: UiService,
    private store: Store<fromApp.AppState>
  ) {}
  initAuthListener() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.store.dispatch(AuthActions.setUid({ payload: user.uid }));
        this.store.dispatch(AuthActions.setAuthenticated());
        this.store.select(authSelector.isAuthenticated);
        this.router.navigate(['/training']);
      } else {
        this.store.dispatch(AuthActions.setUnauthenticated());
        this.store.select(authSelector.isAuthenticated);
        this.router.navigate(['/login']);
        this.traningService.cancelSubscriptions();
      }
    });
  }
  registerUser(authData: IAuthData) {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(AuthActions.startLoading());
    this.afAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(AuthActions.stopLoading());
        console.log(result);
      })
      .catch((error) => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(AuthActions.stopLoading());
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }

  login(authData: IAuthData) {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(AuthActions.startLoading());
    this.afAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(AuthActions.stopLoading());
      })
      .catch((error) => {
        this.uiService.showSnackbar(error.message, null, 3000);
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch({ type: 'stopLoading' });
      });
  }

  logout() {
    this.afAuth.signOut();
  }
}
