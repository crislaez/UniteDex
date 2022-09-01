import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { BattleItemModule } from '@uniteDex/shared/battle-item/battle-item.module';
import { BuildItemModule } from '@uniteDex/shared/build-item/build-item.module';
import { PokemonModule } from '@uniteDex/shared/pokemon/pokemon.module';
import { NoDataModule } from './../shared-ui/components/no-data/no-data.module';
import { SpinnerModule } from './../shared-ui/components/spinner/spinner.module';
import { ElementCardComponent } from './components/element-card.component';
import { TierListPage } from './containers/tier-list.page';
import { TierListPageRoutingModule } from './tier-list-routing.module';

const SHARED_MODULE = [
  PokemonModule,
  BattleItemModule,
  BuildItemModule,
  // SharedModule,
];

const SHARED_UI_MODULE = [
  NoDataModule,
  SpinnerModule,
  // FilterModalModule,
  // SkeletonCardModule,
  // PokemonCardModule,
  // InfiniteScrollModule,
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ...SHARED_MODULE,
    ...SHARED_UI_MODULE,
    TranslateModule.forChild(),
    RouterModule,
    TierListPageRoutingModule
  ],
  declarations: [
    TierListPage,
    ElementCardComponent
  ]
})
export class TierListPageModule {}
