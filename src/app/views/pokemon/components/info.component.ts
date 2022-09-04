import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { CoreConfigService } from '@uniteDex/core/services/core-config.service';
import { Pokemon } from '@uniteDex/shared/pokemon';
import { errorImage, getObjectKeys, trackById } from '@uniteDex/shared/utils/functions';

@Component({
  selector: '<poke-unite-info',
  template:`
  <ion-card *ngIf="pokemon?.['evolution']?.length > 0" class="text-color-light components-background-eighthiary margin-top-20">
    <ion-card-header>
      <ion-card-title class="text-color-light span-bold">{{ 'COMMON.EVOLUTIONS' | translate }}</ion-card-title>
    </ion-card-header>

    <div class="displays-center">
      <div *ngFor="let evo of pokemon?.['evolution']; trackBy: trackById" class="displays-center div-image">
        <ion-avatar>
          <ion-img [src]="_core.imageUrl('pokemon', evo?.name, true)" (ionError)="errorImage($event)"></ion-img>
        </ion-avatar>
        <span class="text-color-sixtiary">{{evo?.name}}</span>
        <span class="text-color-dark-light">{{ 'COMMON.LV' | translate }} {{ evo?.level }}</span>
      </div>
    </div>
  </ion-card>

  <ion-card *ngIf="pokemon?.notes" class="text-color-light components-background-eighthiary margin-top-20">
    <ion-card-header>
      <ion-card-title class="text-color-light span-bold">{{ 'COMMON.NOTES' | translate }}</ion-card-title>
    </ion-card-header>

    <div class="displays-center">
      <div class="padding-20">
        {{ pokemon?.notes }}
      </div>
    </div>
  </ion-card>

  <!-- IS NO DATA  -->
  <ng-container *ngIf="(!pokemon?.['evolution'] || pokemon?.['evolution']?.length === 0) && !pokemon?.notes">
    <poke-unite-no-data [title]="'COMMON.NORESULT'" [image]="'assets/images/empty.png'" [top]="'15vh'"></poke-unite-no-data>
  </ng-container>
  `,
  styleUrls: ['./info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoComponent {

  trackById = trackById;
  errorImage = errorImage;
  getObjectKeys = getObjectKeys;
  @Input() pokemon: Partial<Pokemon>;


  constructor(
    public _core: CoreConfigService
  ) { }



}
