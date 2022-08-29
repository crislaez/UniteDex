import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'poke-unite-skeleton-card',
  template:`
  <ion-card class="ion-activatable ripple-parent slide-ion-card"  >

    <div class="mat-card-header">
      <div class="div-image"></div>
    </div>

    <!-- <div class="card-content">
      <div class="div-p"></div>
    </div> -->
  </ion-card>
  `,
  styleUrls: ['./skeleton-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonCardComponent {

  constructor() { }


}
