import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, take, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { IExercise } from './exercise.interface';
import { UiService } from '../shared/ui.service';
import * as fromTrainingReducer from './store/training.reducer';
import * as TrainingActions from './store/traning.actions';
import * as trainingSelector from './store/training.selectors';

@Injectable()
export class TrainingService {
  private fireBaseSubs$: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UiService,
    private store: Store<fromTrainingReducer.State>
  ) {}
  fetchAvailableExercises() {
    this.fireBaseSubs$.push(
      this.db
        .collection('availableExercises')
        .snapshotChanges()
        .pipe(
          map((docArray) => {
            return docArray.map((doc) => {
              return {
                id: doc.payload.doc.id,
                ...(doc.payload.doc.data() as IExercise),
              };
            });
          })
        )
        .subscribe(
          (exercise: IExercise[]) => {
            // this.availableExercises = exercises;
            // this.exercisesChanged.next([...this.availableExercises]);
            this.store.dispatch(
              TrainingActions.setAvailableTrainings({ payload: exercise })
            );
          },
          (error) => {
            console.log(error);
            this.uiService.showSnackbar(
              'دریافت اطلاعات با خطا مواجه شد لطفن دوباره تلاش کنید ',
              null,
              3000
            );
          }
        )
    );
  }

  startExercise(selectedId: string) {
    this.store.dispatch(TrainingActions.startTraining({ payload: selectedId }));
  }
  completeExercise() {
    this.store
      .select(trainingSelector.getActiveTrainings)
      .pipe(take(1))
      .subscribe((exercise: IExercise) => {
        this.addDataToDatabase({
          ...exercise!,
          date: new Date(),
          state: 'به اتمام رسیده',
        });
        this.store.dispatch(TrainingActions.stopTraining());
      });
  }

  cancelExercise(progress: number) {
    this.store
      .select(trainingSelector.getActiveTrainings)
      .pipe(take(1))
      .subscribe((exercise: IExercise) => {
        this.addDataToDatabase({
          ...exercise!,
          duration: exercise!.duration * (progress / 100),
          calories: exercise!.calories * (progress / 100),
          date: new Date(),
          state: 'تمام نشده',
        });
        this.store.dispatch(TrainingActions.stopTraining());
      });
  }

  fetchCompletedOrCanceledExercises() {
    this.fireBaseSubs$.push(
      this.store
        .pipe(
          take(1),
          map((state) => state.auth.uid),
          switchMap((uid) => {
            return this.db
              .collection('finishedExercises-' + uid)
              .valueChanges();
          })
        )
        .subscribe((exercises: IExercise[]) => {
          this.store.dispatch(
            TrainingActions.setFinishedTrainings({ payload: exercises })
          );
        })
    );
  }

  cancelSubscriptions() {
    this.fireBaseSubs$.forEach((sub) => {
      sub.unsubscribe();
    });
  }
  private addDataToDatabase(exercise: IExercise) {
    this.store
      .pipe(
        map((state) => state.auth.uid),
        take(1)
      )
      .subscribe((uid) => {
        this.db.collection('finishedExercises-' + uid).add(exercise);
      });
  }
}
