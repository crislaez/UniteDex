import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { EntityStatus } from '@uniteDex/shared/models';
import { NotificationActions } from '@uniteDex/shared/notification';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as StatsActions from '../actions/stat.actions';
import { StatService } from '../services/stat.service';


@Injectable()
export class StatEffects implements OnInitEffects {

  loadStats$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StatsActions.loadStats),
      switchMap(() => {
        return this._stat.getStats().pipe(
          map(({stats}) => StatsActions.saveStats({ stats, error:undefined, status:EntityStatus.Loaded })),
          catchError(error => {
            return of(
              StatsActions.saveStats({ stats:[], error, status:EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_STATS'})
            )
          })
        )
      })
    )
  });


  ngrxOnInitEffects() {
    return StatsActions.loadStats()
  };


  constructor(
    private actions$: Actions,
    private _stat: StatService,
    public toastController: ToastController,
  ) { }


}
