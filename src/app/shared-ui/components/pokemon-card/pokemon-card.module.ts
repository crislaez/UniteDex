import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { PokemonCardComponent } from './pokemon-card.component';



@NgModule({
  declarations: [
    PokemonCardComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    TranslateModule.forChild(),
  ],
  exports:[
    PokemonCardComponent
  ]
})
export class PokemonCardModule { }
