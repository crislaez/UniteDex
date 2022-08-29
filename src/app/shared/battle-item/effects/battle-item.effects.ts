import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { EntityStatus } from '@uniteDex/shared/models';
import { NotificationActions } from '@uniteDex/shared/notification';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as BattleItemActions from '../actions/battle-item.actions';
import { BattleItemService } from '../services/battle-item.service';


@Injectable()
export class BattleItemEffects implements OnInitEffects {

  loadBattleItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BattleItemActions.loadBattleItems),
      switchMap(({filters}) => {
        return this._battleItem.getBattleItems().pipe(
          map(({battleItems}) => BattleItemActions.saveBattleItems({ battleItems, filters, error:undefined, status:EntityStatus.Loaded })),
          catchError(error => {
            return of(
              BattleItemActions.saveBattleItems({ battleItems:[], filters, error, status:EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_BATTLE_ITEMS'})
            )
          })
        )
      })
    )
  });


  ngrxOnInitEffects() {
    return BattleItemActions.loadBattleItems({})
  };


  constructor(
    private actions$: Actions,
    private _battleItem: BattleItemService,
    public toastController: ToastController,
  ) { }


}
