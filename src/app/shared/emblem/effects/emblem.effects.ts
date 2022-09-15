import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { EntityStatus } from '@uniteDex/shared/models';
import { NotificationActions } from '@uniteDex/shared/notification';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as EmblemActions from '../actions/emblem.actions';
import { EmblemService } from '../services/emblem.service';


@Injectable()
export class EmblemEffects implements OnInitEffects {

  initLoadEmblem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EmblemActions.initLoadEmblem),
      switchMap(() => {
        return of(EmblemActions.loadEmblems(), EmblemActions.loadEmblemsColors())
      })
    )
  });

  loadEmblems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EmblemActions.loadEmblems),
      switchMap(() => {
        return this._emblem.getEmblems().pipe(
          map(({emblems}) => EmblemActions.saveEmblems({ emblems, error:undefined, status:EntityStatus.Loaded })),
          catchError(error => {
            return of(
              EmblemActions.saveEmblems({ emblems:[], error, status:EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_EMBLEMS'})
            )
          })
        )
      })
    )
  });

  loadEmblemsColors$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EmblemActions.loadEmblemsColors),
      switchMap(() => {
        return this._emblem.getEmblemsColors().pipe(
          map(({emblemColors}) => EmblemActions.saveEmblemsColors({ emblemColors, error:undefined, status:EntityStatus.Loaded })),
          catchError(error => {
            return of(
              EmblemActions.saveEmblemsColors({ emblemColors:[], error, status:EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_EMBLEMS_COLORS'})
            )
          })
        )
      })
    )
  });


  ngrxOnInitEffects() {
    return EmblemActions.initLoadEmblem();
  };



  constructor(
    private actions$: Actions,
    private _emblem: EmblemService,
    public toastController: ToastController,
  ) { }


}
