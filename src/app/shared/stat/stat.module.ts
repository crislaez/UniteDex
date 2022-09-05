import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NotificationModule } from '../notification/notification.module';
import { StatEffects } from './effects/stat.effects';
import * as fromStat from './reducers/stat.reducer';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NotificationModule,
    StoreModule.forFeature(fromStat.statFeatureKey, fromStat.reducer),
    EffectsModule.forFeature([StatEffects]),
  ]
})
export class StatModule { }
