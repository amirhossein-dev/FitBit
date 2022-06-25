import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-stop-training',
  template: `<style>
      h1 {
        font-family: 'Vazirmatn', sans-serif;
      }
      button {
        font-family: 'Vazirmatn', sans-serif;
        font-size: 1rem;
        margin-bottom: 5px;
      }
    </style>
    <h1 mat-dialog-title>آیا مطمئن هستید</h1>
    <mat-dialog-content>
      <p>شما {{ passedData.progress }}% از تمرین را انجام داده اید</p>
    </mat-dialog-content>
    <mat-dialog-actions fxLayoutAlign="center">
      <button mat-raised-button [mat-dialog-close]="true">بله</button>
      <button mat-raised-button [mat-dialog-close]="false">خیر</button>
    </mat-dialog-actions>`,
})
export class StopTrainingComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {}
}
