import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { FilterModalModule } from '@uniteDex/shared-ui/components/filter-modal/filter-modal.module';
import { SkeletonCardModule } from '@uniteDex/shared-ui/components/skeleton-card/skeleton-card.module';
import { BattleItemModule } from '@uniteDex/shared/battle-item/battle-item.module';
import { BuildItemModule } from '@uniteDex/shared/build-item/build-item.module';
import { PokemonModule } from '@uniteDex/shared/pokemon/pokemon.module';
import { InfiniteScrollModule } from './../shared-ui/components/infinite-scroll/infinite-scroll.module';
import { NoDataModule } from './../shared-ui/components/no-data/no-data.module';
import { PokemonCardModule } from './../shared-ui/components/pokemon-card/pokemon-card.module';
import { SpinnerModule } from './../shared-ui/components/spinner/spinner.module';
import { SharedModule } from './../shared/shared/shared.module';
import { GenericPageComponent } from './containers/generic-page.component';
import { GenericPageRoutingModule } from './generic-routing.module';


const SHARED_MODULE = [
  PokemonModule,
  BattleItemModule,
  BuildItemModule,
  SharedModule,
];

const SHARED_UI_MODULE = [
  NoDataModule,
  // SpinnerModule,
  FilterModalModule,
  SkeletonCardModule,
  PokemonCardModule,
  InfiniteScrollModule,
];


@NgModule({
  declarations: [
    GenericPageComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ...SHARED_MODULE,
    ...SHARED_UI_MODULE,
    TranslateModule.forChild(),
    GenericPageRoutingModule
  ]
})
export class GenericModule { }
