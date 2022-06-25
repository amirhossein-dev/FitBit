import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import * as fromApp from '../store/app.state';
import * as authSelector from './store/auth.selector';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private store: Store<fromApp.AppState>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    // if () {
    //   this.router.navigate(['/login']);
    // }
    // return this.store.select(authSelector.isAuthenticated).pipe(take(1),tap(isTrue =>{
    //   if (isTrue) {
    //     this.router.navigate(['/login']);
    //   }
    // }));

    // return this.store.select(authSelector.isAuthenticated).pipe(map(authenticate => {
    //   if(!authenticate){
    //     this.router.navigate(['/login']);
    //   }
    //   return true
    // }));

    return this.store.select(authSelector.isAuthenticated).pipe(
      take(1),
      map((auth) => {
        if (auth) {
          return true;
        } else {
          return this.router.createUrlTree(['login']);
        }
      })
    );
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    // if () {
    //   this.router.navigate(['/login']);
    // }
    // return this.store.select(authSelector.isAuthenticated).pipe(take(1));
    // return this.store.select(authSelector.isAuthenticated).pipe(map(authenticate => {
    //   if(!authenticate){
    //     this.router.navigate(['/login']);
    //   }
    //   return true
    // }));
    return this.store.select(authSelector.isAuthenticated).pipe(
      take(1),
      map((auth) => {
        if (auth) {
          return true;
        } else {
          return this.router.createUrlTree(['/login']);
        }
      })
    );
  }
}
