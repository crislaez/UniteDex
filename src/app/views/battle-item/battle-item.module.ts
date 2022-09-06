import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { NoDataModule } from '@uniteDex/shared-ui/components/no-data/no-data.module';
import { SpinnerModule } from '@uniteDex/shared-ui/components/spinner/spinner.module';
import { BattleItemModule } from '@uniteDex/shared/battle-item/battle-item.module';
import { SharedModule } from '@uniteDex/shared/shared/shared.module';
import { BattleItemPageRoutingModule } from './battle-item-routing.module';
import { BattleItemInfoComponent } from './components/battle-item-info.component';
import { BattleItemPage } from './containers/battle-item.page';

const SHARED_MODULE = [
  BattleItemModule,
  SharedModule
];

const SHARED_UI_MODULE = [
  NoDataModule,
  SpinnerModule,
];


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ...SHARED_MODULE,
    ...SHARED_UI_MODULE,
    TranslateModule.forChild(),
    BattleItemPageRoutingModule
  ],
  declarations: [
    BattleItemPage,
    BattleItemInfoComponent
  ]
})
export class BattleItemPageModule {}
