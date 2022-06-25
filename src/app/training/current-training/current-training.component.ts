import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import { TrainingService } from '../training.service';
import { StopTrainingComponent } from './stop-training.component';
import * as fromTraining from '../store/training.reducer';
import * as trainingSelector from '../store/training.selectors';
import { IExercise } from '../exercise.interface';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss'],
})
export class CurrentTrainingComponent implements OnInit {
  progress: number = 0;
  timer!: any;
  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    this.store
      .select(trainingSelector.getActiveTrainings)
      .pipe(take(1))
      .subscribe((exercise: IExercise) => {
        const step = (exercise.duration! / 100) * 1000;
        this.timer = setInterval(() => {
          this.progress = this.progress + 1;
          if (this.progress >= 100) {
            this.trainingService.completeExercise();
            clearInterval(this.timer);
          }
        }, step);
      });
    // const step =
    //   (this.trainingService.getRunningExercise().duration! / 100) * 1000;
    // this.timer = setInterval(() => {
    //   this.progress = this.progress + 1;
    //   if (this.progress >= 100) {
    //     this.trainingService.completeExercise();
    //     clearInterval(this.timer);
    //   }
    // }, step);
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.trainingService.cancelExercise(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}
