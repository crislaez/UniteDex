import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BuildItem } from '@uniteDex/shared/build-item/models/index';

@Component({
  selector: 'poke-unite-build-item-info',
  template: `
   <ion-card *ngIf="buildItem?.['stats']?.length > 0" class="text-color-light components-background-eighthiary margin-top-20 margin-bottom-60">
    <ion-card-header>
      <ion-card-title class="text-color-light span-bold displays-around">
        <div>{{ buildItem?.name }}</div>
        <div>{{ 'COMMON.BUILD_ITEMS' | translate  }}</div>
      </ion-card-title>
    </ion-card-header>

    <ion-card-header>
      <ion-card-title class="text-color-light span-bold displays-around height-1-3">
        <div class="width-15 height-1-3">{{ 'COMMON.LV' | translate }} </div>
        <div class="width-65 height-1-3"><ion-range class="height-1-3" [min]="1" [max]="30" (ionChange)="changeLevel($event)"></ion-range></div>
        <div class="width-15 height-1-3">{{ level }} </div>
      </ion-card-title>
    </ion-card-header>

    <div class="displays-center">
      <div *ngIf="buildItem?.['bonus1'] as bonus1" class="padding-20 color-green">{{ getValue(bonus1, false) }}</div>
      <div *ngIf="buildItem?.['bonus2'] as bonus2" class="padding-20 color-green">{{ getValue(bonus2, true) }}</div>
      <div *ngIf="buildItem?.['description1'] as description1" class="padding-20">{{ description1 }}</div>
      <div *ngIf="buildItem?.['description3'] as description3" class="padding-20 color-green">{{ getRemainingValue(buildItem) }} {{ description3 }}</div>
    </div>
  </ion-card>
  `,
  styleUrls: ['./build-item-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuildItemInfoComponent {

  @Input() buildItem: Partial<BuildItem>;
  @Input() level: number;
  @Output() change = new EventEmitter<number>()
  maxLevel = 30;


  constructor() { }


  changeLevel({detail:{value}}:any): void{
    this.change.next(value)
  }

  getValue(field:string, showPercentage: boolean): string {
    const [first = null, value = null] = field?.split('+') || [];

    return !showPercentage
          ? first + ' + ' + (Math.ceil(this.level * Number(value?.replace('%','') || '') / this.maxLevel))?.toFixed(1)?.toString()
          : first + ' + ' + (this.level * Number(value?.replace('%','') || '') / this.maxLevel)?.toFixed(1)?.toString() + '%'
  }

  getRemainingValue(buildItem: Partial<BuildItem>): string {
    return this.level < 10
          ? buildItem?.level1
          : this.level >= 10 && this.level < 20
          ? buildItem?.level10
          : buildItem?.level20
  }


}
