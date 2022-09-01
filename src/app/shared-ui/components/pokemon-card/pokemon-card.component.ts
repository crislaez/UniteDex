import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CoreConfigService } from '@uniteDex/core/services/core-config.service';
import { Pokemon } from '@uniteDex/shared/pokemon';
import { errorImage, getImage, sliceText } from '@uniteDex/shared/utils/functions';


@Component({
  selector: 'poke-unite-pokemon-card',
  template:`
  <ion-card class="ion-activatable ripple-parent pokemon-card" [routerLink]="['/'+type+'/'+pokemon?.name]">
    <div class="ion-card-pokeball">
      <div class="ion-card-pokeball-circle"></div>
    </div>

    <div class="pokemon-item displays-around" >
      <div class="pokemon-item-title displays-center" >
        <div class="span-text text-color-light"><span class="span-bold">{{ sliceText(pokemon?.name, 15) }}</span></div>
      </div>

      <div class="pokemon-item-types">
        <ion-chip *ngIf="pokemon?.damage_type">
          <ion-label>{{ pokemon?.damage_type }}</ion-label>
        </ion-chip>
        <ion-chip *ngIf="pokemon?.tags?.range">
          <ion-label>{{ pokemon?.tags?.range }}</ion-label>
        </ion-chip>
      </div>

      <div class="pokemon-item-avatar">
        <ion-avatar slot="start">
          <ion-img loading="lazy" [src]="_core.imageUrl(type, pokemon?.name)" [alt]="pokemon?.name" (ionError)="errorImage($event)"></ion-img>
        </ion-avatar>
      </div>
    </div>

    <!-- RIPLE EFFECT  -->
    <ion-ripple-effect></ion-ripple-effect>
  </ion-card>
  `,
  styleUrls: ['./pokemon-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonCardComponent {

  getImage = getImage;
  sliceText = sliceText;
  errorImage = errorImage;
  @Input() pokemon: Pokemon;
  @Input() type: string;


  constructor(
    public _core: CoreConfigService
  ) { }

}
