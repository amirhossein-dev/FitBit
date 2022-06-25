import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthService } from '../auth.service';
import * as authSelector from '../store/auth.selector';
import * as fromApp from '../../store/app.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading$!: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(authSelector.SelectAuthIsLoading);

    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', { validators: [Validators.required] }),
    });

    this.snackBar.open(
      'برای استفاده از وبسایت حتمن فیلتر شکن خودرا روشن کنید',
      null,
      { duration: 4000 }
    );
  }

  onSubmit() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    });
  }
}
