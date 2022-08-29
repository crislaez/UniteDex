import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SpinnerModule } from './../spinner/spinner.module';
import { InfiniteScrollComponent } from './infinite-scroll.component';



@NgModule({
  declarations: [
    InfiniteScrollComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    SpinnerModule,
    TranslateModule.forChild(),
  ],
  exports:[
    InfiniteScrollComponent
  ]
})
export class InfiniteScrollModule { }
