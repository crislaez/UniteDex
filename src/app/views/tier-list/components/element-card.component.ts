import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CoreConfigService } from '@uniteDex/core/services/core-config.service';
import { BattleItem } from '@uniteDex/shared/battle-item/models/index';
import { BuildItem } from '@uniteDex/shared/build-item/models/index';
import { Pokemon } from '@uniteDex/shared/pokemon/models/index';
import { errorImage, getObjectKeys, orderArray, sliceText, trackById } from '@uniteDex/shared/utils/functions';

@Component({
  selector: 'poke-unite-element-card',
  template:`
  <ion-card class="text-color-light components-background-eighthiary margin-top-20"
    *ngFor="let key of orderSFirst(orderArray(getObjectKeys(tierList)))">

    <ion-card-header [ngClass]="{'S':key === 'S', 'A':key === 'A', 'B':key === 'B', 'C':key === 'C', 'D':key === 'D'}">
      <ion-card-title *ngIf="key" class="text-color-light shadow-text span-bold">
        {{ key }}
      </ion-card-title>
    </ion-card-header>

    <div class="displays-between" >
      <div class="pokemon-element"
        *ngFor="let item of tierList[key]; let i = index; trackBy: trackById"
        [routerLink]="['/'+type+'/'+item?.name]">

        <div class="marker "*ngIf="['Up','Down']?.includes(item?.tier_change)" [ngStyle]="{'color':item?.tier_change === 'Up' ? '#44EE44': '#FF2D82'}">
          <ng-container *ngIf="item?.tier_change === 'Up'" >
            <ion-icon name="caret-up-outline"></ion-icon>
          </ng-container>
          <ng-container *ngIf="item?.tier_change === 'Down'" >
            <ion-icon name="caret-down-outline"></ion-icon>
          </ng-container>
        </div>

        <ion-avatar>
          <ion-img [src]="_core.imageUrl(type, item?.name)" (ionError)="errorImage($event)"></ion-img>
        </ion-avatar>

        <div>
          <div>{{ sliceText(item?.name, 10) }}</div>
        </div>
      </div>
    </div>
  </ion-card>
  `,
  styleUrls: ['./element-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ElementCardComponent {

  sliceText = sliceText;
  trackById = trackById;
  orderArray = orderArray;
  errorImage = errorImage;
  getObjectKeys = getObjectKeys;

  @Input() tierList: {[key:string]:(Pokemon | BattleItem | BuildItem)[]};
  @Input() type: string = 'pokemon';


  constructor(
    public _core: CoreConfigService
  ) { }


  orderSFirst(list: string[]): string[] {
    const listWithoutSRange = (list || [])?.filter(item => item !== 'S')
    return list?.includes('S')
            ? ['S', ...(listWithoutSRange ?? [])]
            : listWithoutSRange || [];
  }


}
