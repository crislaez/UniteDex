import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { FilterModalModule } from '@uniteDex/shared-ui/components/filter-modal/filter-modal.module';
import { InfiniteScrollModule } from '@uniteDex/shared-ui/components/infinite-scroll/infinite-scroll.module';
import { NoDataModule } from '@uniteDex/shared-ui/components/no-data/no-data.module';
import { SpinnerModule } from '@uniteDex/shared-ui/components/spinner/spinner.module';
import { EmblemModule } from '@uniteDex/shared/emblem/emblem.module';
import { SharedModule } from '@uniteDex/shared/shared/shared.module';
import { EmblemDetailModalComponent } from './components/emblem-detail-modal.component';
import { EmblemPage } from './containers/emblem.page';
import { EmblemPageRoutingModule } from './emblem-routing.module';

const SHARED_MODULE = [
  EmblemModule,
  SharedModule,
];

const SHARED_UI_MODULE = [
  NoDataModule,
  SpinnerModule,
  InfiniteScrollModule,
  FilterModalModule,
  // SkeletonCardModule,
  // PokemonCardModule,
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
  declarations: [
    EmblemPage,
    EmblemDetailModalComponent
  ]
})
export class EmblemPageModule {}
