import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TrainingService } from '../training.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { IExercise } from '../exercise.interface';
import * as fromTraining from '../store/training.reducer';
import * as trainingSelector from '../store/training.selectors';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit {
  exercises$!: Observable<IExercise[]>;
  isLoading$!: Observable<boolean>;

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit(): void {
    this.exercises$ = this.store.select(trainingSelector.getAvailableExercises);
    this.trainingService.fetchAvailableExercises();
  }
  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
