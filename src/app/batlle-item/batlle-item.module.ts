import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { NoDataModule } from '@uniteDex/shared-ui/components/no-data/no-data.module';
import { SpinnerModule } from '@uniteDex/shared-ui/components/spinner/spinner.module';
import { BattleItemModule } from '@uniteDex/shared/battle-item/battle-item.module';
import { SharedModule } from '@uniteDex/shared/shared/shared.module';
import { BatlleItemPageRoutingModule } from './batlle-item-routing.module';
import { BatlleItemPage } from './containers/batlle-item.page';


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
    BatlleItemPageRoutingModule
  ],
  declarations: [BatlleItemPage]
})
export class BatlleItemPageModule {}
