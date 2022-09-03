import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollModule } from '@uniteDex/shared-ui/components/infinite-scroll/infinite-scroll.module';
import { NoDataModule } from '@uniteDex/shared-ui/components/no-data/no-data.module';
import { PokemonCardModule } from '@uniteDex/shared-ui/components/pokemon-card/pokemon-card.module';
import { SpinnerModule } from '@uniteDex/shared-ui/components/spinner/spinner.module';
import { SwiperComponentModule } from '@uniteDex/shared-ui/components/swiper-component/swiper-component.module';
import { BattleItemModule } from '@uniteDex/shared/battle-item/battle-item.module';
import { BuildItemModule } from '@uniteDex/shared/build-item/build-item.module';
import { PokemonModule } from '@uniteDex/shared/pokemon/pokemon.module';
import { SharedModule } from '@uniteDex/shared/shared/shared.module';
import { HomePage } from './containers/home.page';
import { HomePageRoutingModule } from './home-routing.module';

const SHARED_MODULE = [
  PokemonModule,
  BattleItemModule,
  BuildItemModule,
  SharedModule,
];

const SHARED_UI_MODULE = [
  NoDataModule,
  SpinnerModule,
  PokemonCardModule,
  SwiperComponentModule,
  InfiniteScrollModule,
];


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ...SHARED_MODULE,
    ...SHARED_UI_MODULE,
    TranslateModule.forChild(),
    HomePageRoutingModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
