import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import * as fromApp from '../../store/app.state';
import * as authSelector from '../store/auth.selector';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(authSelector.SelectAuthIsLoading);
    this.snackBar.open(
      'برای استفاده از وبسایت حتمن فیلتر شکن خودرا روشن کنید',
      null,
      { duration: 4000 }
    );
  }
  onSubmit(f: NgForm) {
    this.authService.registerUser({
      email: f.value.email,
      password: f.value.password,
    });
  }
}
