import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable()
export class UiService {
  loadingStateChanged = new Subject<boolean>();
  constructor(private snackbar: MatSnackBar) {}
  showSnackbar(message: string, action: null, duration: number) {
    this.snackbar.open(message, action, {
      duration: duration,
    });
  }
}
