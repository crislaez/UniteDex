import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NotificationModule } from '../notification/notification.module';
import { BattleItemEffects } from './effects/battle-item.effects';
import * as fromBattleItem from './reducers/battle-item.reducer';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NotificationModule,
    StoreModule.forFeature(fromBattleItem.battleItemFeatureKey, fromBattleItem.reducer),
    EffectsModule.forFeature([BattleItemEffects]),
  ]
})
export class BattleItemModule { }
