import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { FilterModalComponent } from './filter-modal.component';



@NgModule({
  declarations: [
    FilterModalComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule.forChild(),
  ],
  exports:[
    FilterModalComponent
  ]
})
export class FilterModalModule { }
