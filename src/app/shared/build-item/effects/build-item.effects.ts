import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { EntityStatus } from '@uniteDex/shared/models';
import { NotificationActions } from '@uniteDex/shared/notification';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as BuildItemActions from '../actions/build-item.actions';
import { BuildItemService } from '../services/build-item.service';


@Injectable()
export class BuildItemEffects implements OnInitEffects {

  loadBuildItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BuildItemActions.loadBuildItems),
      switchMap(({filters}) => {
        return this._buildItem.getBuildItems().pipe(
          map(({buildItems}) => BuildItemActions.saveBuildItems({ buildItems, filters, error:undefined, status:EntityStatus.Loaded })),
          catchError(error => {
            return of(
              BuildItemActions.saveBuildItems({ buildItems:[], filters, error, status:EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_BUILD_ITEMS'})
            )
          })
        )
      })
    )
  });


  ngrxOnInitEffects() {
    return BuildItemActions.loadBuildItems({})
  };


  constructor(
    private actions$: Actions,
    private _buildItem: BuildItemService,
    public toastController: ToastController,
  ) { }


}
