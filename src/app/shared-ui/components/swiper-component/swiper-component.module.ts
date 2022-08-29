
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SwiperModule } from 'swiper/angular';
import { NoDataModule } from '../no-data/no-data.module';
import { PokemonCardModule } from '../pokemon-card/pokemon-card.module';
import { SkeletonCardModule } from '../skeleton-card/skeleton-card.module';
import { SwiperComponent } from './swiper.component';

@NgModule({
  declarations: [
    SwiperComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    SwiperModule,
    NoDataModule,
    PokemonCardModule,
    SkeletonCardModule,
    RouterModule,
    TranslateModule.forChild()
  ],
  exports:[
    SwiperComponent
  ]
})
export class SwiperComponentModule { }
