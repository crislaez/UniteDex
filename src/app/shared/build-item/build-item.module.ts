import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NotificationModule } from '../notification/notification.module';
import { BuildItemEffects } from './effects/build-item.effects';
import * as fromBuilitem from './reducers/build-item.reducer';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NotificationModule,
    StoreModule.forFeature(fromBuilitem.buildItemFeatureKey, fromBuilitem.reducer),
    EffectsModule.forFeature([BuildItemEffects]),
  ]
})
export class BuildItemModule { }
