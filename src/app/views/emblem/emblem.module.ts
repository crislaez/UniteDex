import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { NoDataModule } from '@uniteDex/shared-ui/components/no-data/no-data.module';
import { EmblemModule } from '@uniteDex/shared/emblem/emblem.module';
import { SharedModule } from '@uniteDex/shared/shared/shared.module';
import { EmblemPage } from './containers/emblem.page';
import { EmblemPageRoutingModule } from './emblem-routing.module';

const SHARED_MODULE = [
  EmblemModule,
  SharedModule,
];

const SHARED_UI_MODULE = [
  NoDataModule,
  // SpinnerModule,
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
    EmblemPageRoutingModule
  ],
  declarations: [EmblemPage]
})
export class EmblemPageModule {}
