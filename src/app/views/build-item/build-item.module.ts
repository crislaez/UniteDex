import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { NoDataModule } from '@uniteDex/shared-ui/components/no-data/no-data.module';
import { SpinnerModule } from '@uniteDex/shared-ui/components/spinner/spinner.module';
import { BuildItemModule } from '@uniteDex/shared/build-item/build-item.module';
import { SharedModule } from '@uniteDex/shared/shared/shared.module';
import { BuildItemPageRoutingModule } from './build-item-routing.module';
import { BuildItemPage } from './containers/build-item.page';

const SHARED_MODULE = [
  BuildItemModule,
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
    BuildItemPageRoutingModule
  ],
  declarations: [BuildItemPage]
})
export class BuildItemPageModule {}
