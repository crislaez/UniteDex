import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoDataComponent } from './no-data.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    NoDataComponent
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
  ],
  exports:[
    NoDataComponent
  ]
})
export class NoDataModule { }
