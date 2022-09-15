import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CoreConfigService } from '@uniteDex/core/services/core-config.service';
import { EntityStatus } from '@uniteDex/shared/models';
import { errorImage, getImage, getSliderConfig, sliceText, trackByFn } from '@uniteDex/shared/utils/functions';
import SwiperCore, { Navigation, Pagination } from 'swiper';

SwiperCore.use([Pagination, Navigation]);

@Component({
  selector: 'poke-unite-swiper',
  template:`
  <div class="header" no-border>
    <div class="div-center">
      <h2 class="text-color-light">{{ title | translate }}</h2>
      <span class="ion-activatable ripple-parent" *ngIf="showMore && !['pending','error']?.includes(status)" [routerLink]="['/list/'+hash]">
        {{ 'COMMON.SHEE_MORE' | translate }}
        <!-- RIPLE EFFECT  -->
        <ion-ripple-effect></ion-ripple-effect>
      </span>
    </div>
  </div>

  <ng-container *ngIf="status === 'loaded'">
    <ng-container *ngIf="items?.length > 0; else noData">
      <swiper #swiper effect="fade" [config]="getSliderConfig(items)" >
        <ng-template swiperSlide *ngFor="let item of items; trackBy: trackByFn" >
          <poke-unite-pokemon-card
            [type]="type"
            [pokemon]="item">
          </poke-unite-pokemon-card>
        </ng-template>
      </swiper>
    </ng-container>
  </ng-container>

  <ng-container *ngIf="status === 'pending'">
    <swiper #swiper effect="fade" [config]="getSliderConfig([0,1,2])">
      <ng-template swiperSlide *ngFor="let item of [0,1,2]">
        <poke-unite-skeleton-card>
        </poke-unite-skeleton-card>
      </ng-template>
    </swiper>
  </ng-container>

  <!-- IS ERROR -->
  <ng-container *ngIf="status === 'error'">
    <poke-unite-no-data [title]="'COMMON.ERROR'" [image]="'assets/images/error.png'" [top]="'3vh'"></poke-unite-no-data>
  </ng-container>

  <!-- IS NO DATA  -->
  <ng-template #noData>
    <poke-unite-no-data [title]="'COMMON.NORESULT'" [image]="'assets/images/empty.png'" [top]="'15vh'"></poke-unite-no-data>
  </ng-template>
  `,
  styleUrls: ['./swiper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwiperComponent {

  getImage = getImage;
  sliceText = sliceText;
  trackByFn = trackByFn;
  errorImage = errorImage;
  getSliderConfig = getSliderConfig;

  @Input() title: string;
  @Input() hash: string;
  @Input() items: any[]; //(Pokemon | BuildItem | BattleItem)[]//
  @Input() status: EntityStatus;
  @Input() showMore: boolean;
  @Input() type: string;

  constructor(
    public _core: CoreConfigService
  ) { }


}
