import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SkeletonCardComponent } from './skeleton-card.component';



@NgModule({
  declarations: [
    SkeletonCardComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule.forChild(),
  ],
  exports:[
    SkeletonCardComponent
  ]
})
export class SkeletonCardModule { }
