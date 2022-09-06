import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { EntityStatus } from '@uniteDex/shared/models';
import { NotificationActions } from '@uniteDex/shared/notification';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as StatsActions from '../actions/emblem.actions';
import { EmblemService } from '../services/emblem.service';


@Injectable()
export class EmblemEffects implements OnInitEffects {

  initLoadEmblem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StatsActions.initLoadEmblem),
      switchMap(() => {
        return of(StatsActions.loadEmblems(), StatsActions.loadEmblemsColors())
      })
    )
  });

  loadEmblems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StatsActions.loadEmblems),
      switchMap(() => {
        return this._emblem.getEmblems().pipe(
          map(({emblems}) => StatsActions.saveEmblems({ emblems, error:undefined, status:EntityStatus.Loaded })),
          catchError(error => {
            return of(
              StatsActions.saveEmblems({ emblems:[], error, status:EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_EMBLEMS'})
            )
          })
        )
      })
    )
  });

  loadEmblemsColors$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StatsActions.loadEmblemsColors),
      switchMap(() => {
        return this._emblem.getEmblemsColors().pipe(
          map(({emblemColors}) => StatsActions.saveEmblemsColors({ emblemColors, error:undefined, status:EntityStatus.Loaded })),
          catchError(error => {
            return of(
              StatsActions.saveEmblemsColors({ emblemColors:[], error, status:EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_EMBLEMS_COLORS'})
            )
          })
        )
      })
    )
  });


  ngrxOnInitEffects() {
    return StatsActions.initLoadEmblem();
  };



  constructor(
    private actions$: Actions,
    private _emblem: EmblemService,
    public toastController: ToastController,
  ) { }


}
