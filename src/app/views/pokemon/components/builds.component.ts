import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CoreConfigService } from '@uniteDex/core/services/core-config.service';
import { Pokemon } from '@uniteDex/shared/pokemon/models';
import { StatLevel } from '@uniteDex/shared/stat/models';
import { errorImage, itemNameFormat, trackByFn } from '@uniteDex/shared/utils/functions';

@Component({
  selector: 'poke-unite-builds',
  template:`
  <ion-card *ngFor="let build of pokemon?.builds; trackBy: trackByFn"
    class="text-color-light components-background-eighthiary margin-top-20">

    <ion-card-header>
      <ion-card-title *ngIf="build?.name" class="text-color-light span-bold">{{ build?.name }}</ion-card-title>
      <ion-card-subtitle *ngIf="build?.lane" class="text-color-light"> {{ 'COMMON.PATH' | translate }}: {{ build?.lane }} </ion-card-subtitle>
    </ion-card-header>

    <ng-container *ngIf="getMoves(build?.['basic'], build?.['upgrade']) as moves">
      <ng-container *ngIf="moves?.length > 0">
        <div class="displays-around margin-top-10">
          <div *ngFor="let move of moves; trackBy: trackByFn; let i = index;" class="width-20 span-bold">
            <ion-avatar class="margin-bottom-10">
              <ion-img [src]="_core.imageUrl(pokemon?.name, move)" (ionError)="errorImage($event)"></ion-img>
            </ion-avatar>
            <div class="text-color-light font-small">{{ move }}</div>
            <div class="text-color-light font-small">{{ 'COMMON.LV' | translate }} {{ getLevelMove(move, i) }}</div>
          </div>
        </div>
      </ng-container>
    </ng-container>

    <div class="displays-start build-item margin-top-10">
      <div class="div-item-name text-color-sixtiary span-bold displays-center"><div>{{ 'COMMON.HELD' | translate }}:</div></div>

      <div class="displays-start div-item">
        <ng-container *ngIf="build?.held_items?.length > 0; else noItem">
          <div *ngFor="let item of build?.held_items; trackBy: trackByFn" class="displays-around-center div-image">
            <ion-img [src]="_core.imageUrl('buildItem', itemNameFormat(item))" (ionError)="errorImage($event)"></ion-img>
          </div>
        </ng-container>
      </div>
    </div>


    <div class="displays-start build-item">
      <div class="div-item-name text-color-sixtiary span-bold displays-center"><div>{{ 'COMMON.HELD_OPTIONAL' | translate }}:</div></div>

      <div class="displays-start div-item">
        <div *ngIf="build?.held_items_optional; else noItem" class="displays-around-center div-image">
          <ion-img [src]="_core.imageUrl('buildItem', itemNameFormat(build?.held_items_optional))" (ionError)="errorImage($event)"></ion-img>
        </div>
      </div>
    </div>


    <div class="displays-start build-item">
      <div class="div-item-name text-color-sixtiary span-bold displays-center"><div>{{ 'COMMON.BATTLE' | translate }}:</div></div>

      <div class="displays-start div-item">
        <ng-container *ngIf="build?.battle_items?.length > 0; else noItem">
          <div *ngFor="let item of build?.battle_items; trackBy: trackByFn" class="displays-around-center div-image">
            <ion-img [src]="_core.imageUrl('battleItem', itemNameFormat(item))" (ionError)="errorImage($event)"></ion-img>
          </div>
        </ng-container>
      </div>
    </div>


    <div class="displays-start build-item">
      <div class="div-item-name text-color-sixtiary span-bold displays-center"><div>{{ 'COMMON.BATTLE_OPTIONAL' | translate }}:</div></div>

      <div class="displays-start div-item">
        <div *ngIf="build?.battle_items_optional; else noItem" class="displays-around-center div-image">
          <ion-img [src]="_core.imageUrl('battleItem', itemNameFormat(build?.battle_items_optional))" (ionError)="errorImage($event)"></ion-img>
        </div>
      </div>
    </div>

    <ng-template #noItem>
      <div class="span-bold displays-center"><div> - </div></div>
    </ng-template>

  </ion-card>
  `,
  styleUrls: ['./builds.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuildsComponent {

  trackByFn = trackByFn;
  errorImage = errorImage;
  itemNameFormat = itemNameFormat;
  @Input() pokemon: Partial<Pokemon & {stats: StatLevel[]}>;


  constructor(
    public _core: CoreConfigService
  ) { }


  getMoves(basic: string[], upgrade: string[]): string[] {
    return [ ...(basic ?? []), ...(upgrade ?? []) ];
  }

  getLevelMove(move:string, index:number): any{
    if(index < 2){
      if(index === 0) return '1';
      return '3'
    }

    const selectedMove = (this.pokemon?.skills || [])?.find((skill) => {
      return (skill?.upgrades || [])?.find(({name}) => name === move)
    });

    return (selectedMove?.upgrades || [])?.find(({name}) => name === move)?.level1
  }

}
