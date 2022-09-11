import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CoreConfigService } from '@uniteDex/core/services/core-config.service';
import { Pokemon } from '@uniteDex/shared/pokemon';
import { StatLevel } from '@uniteDex/shared/stat/models';
import { errorImage, getObjectKeys, replaceLowBar, trackByName } from '@uniteDex/shared/utils/functions';

@Component({
  selector: '<poke-unite-info',
  template:`
  <ion-card *ngIf="pokemon?.['evolution']?.length > 0" class="text-color-light components-background-eighthiary margin-top-20">
    <ion-card-header>
      <ion-card-title class="text-color-light span-bold">{{ 'COMMON.EVOLUTIONS' | translate }}</ion-card-title>
    </ion-card-header>

    <div class="displays-center">
      <div *ngFor="let evo of pokemon?.['evolution']; trackBy: trackByName" class="displays-center div-image">
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

  <ion-card *ngIf="pokemon?.stats?.length > 0" class="text-color-light components-background-eighthiary margin-top-20 margin-bottom-60">
    <ion-card-header>
      <ion-card-title class="text-color-light span-bold displays-around height-1-3">
        <div class="width-15 height-1-3">{{ 'COMMON.LV' | translate }} </div>
        <div class="width-65 height-1-3"><ion-range  class="height-1-3" [min]="1" [max]="15" (ionChange)="changeLevel($event)"></ion-range></div>
        <div class="width-15 height-1-3">{{ level }} </div>
      </ion-card-title>
    </ion-card-header>

    <div class="displays-between">
      <ng-container *ngFor="let key of getObjectKeys(pokemon?.stats[(level - 1)])">
        <div *ngIf="key !== 'level'" class="text-start width-40 padding-10 capital-letter">
          <ng-container *ngIf="key === 'crit'">{{ 'COMMON.CRITICAL' | translate }}</ng-container>
          <ng-container *ngIf="key === 'cdr'">{{ 'COMMON.REDUCTION' | translate }}</ng-container>
          <ng-container *ngIf="!['crit','cdr']?.includes(key)">{{ replaceLowBar(key) }}</ng-container>
        </div>
        <div *ngIf="key !== 'level'" class="text-end width-40 padding-10 capital-letter">
          {{ pokemon?.stats[(level - 1)]?.[key] }}
          <ng-container *ngIf="['crit','cdr']?.includes(key)">%</ng-container>
        </div>
      </ng-container>
    </div>
  </ion-card>

  <!-- IS NO DATA  -->
  <ng-container *ngIf="(!pokemon?.['evolution'] || pokemon?.['evolution']?.length === 0) && !pokemon?.notes && (pokemon?.stats?.length === 0 || !pokemon?.stats)">
    <poke-unite-no-data [title]="'COMMON.NORESULT'" [image]="'assets/images/empty.png'" [top]="'15vh'"></poke-unite-no-data>
  </ng-container>
  `,
  styleUrls: ['./info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoComponent {

  errorImage = errorImage;
  trackByName = trackByName;
  replaceLowBar = replaceLowBar;
  getObjectKeys = getObjectKeys;
  @Input() pokemon: Partial<Pokemon & {stats: StatLevel[]}>;
  level = 1;


  constructor(
    public _core: CoreConfigService
  ) { }


  changeLevel({detail:{value}}:any): void{
    this.level = value
  }


}
