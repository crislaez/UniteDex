import { BattleItem } from '@uniteDex/shared/battle-item/models/index';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'poke-unite-battle-item-info',
  template: `
  <ion-card class="text-color-light components-background-eighthiary margin-top-20 margin-bottom-60">
    <ion-card-header>
      <ion-card-title class="text-color-light span-bold displays-around">
        <div>{{ battleItem?.name }}</div>
        <div>{{ 'COMMON.BATTLE_ITEMS' | translate  }}</div>
      </ion-card-title>
    </ion-card-header>

    <div class="displays-center">
      <ion-chip> <ion-icon name="time-outline"></ion-icon> {{ battleItem?.cooldown }} s</ion-chip>
      <div *ngIf="battleItem?.['description'] as description" class="padding-20">{{ description }}</div>
      <div *ngIf="battleItem?.['level'] as level" class="padding-20 text-color-sixtiary">{{ 'Unlocks at Trainer Level' }} {{ level }}</div>
    </div>
  </ion-card>
  `,
  styleUrls: ['./battle-item-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BattleItemInfoComponent {

  @Input() battleItem: Partial<BattleItem>;

  constructor() { }


}
