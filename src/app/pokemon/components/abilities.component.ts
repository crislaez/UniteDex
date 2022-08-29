import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CoreConfigService } from '@uniteDex/core/services/core-config.service';
import { Pokemon } from '@uniteDex/shared/pokemon/models';
import { errorImage, trackById } from '@uniteDex/shared/utils/functions';

@Component({
  selector: 'poke-unite-abilities',
  template:`
  <ion-card class="text-color-light components-background-eighthiary margin-top-20"
    *ngFor="let skill of pokemon?.skills; let i = index; trackBy: trackById">

    <ion-card-header>
      <ion-card-title *ngIf="skill?.name" class="text-color-light span-bold">
        <div class="displays-start">
          <ion-avatar>
            <ion-img [src]="_core.imageUrl(pokemon?.name, skill?.name)" (ionError)="errorImage($event)"></ion-img>
          </ion-avatar>
          <div>
            <div>{{ skill?.name }}</div>
            <div class="font-medium">{{ skill?.ability }}</div>
          </div>
        </div>
      </ion-card-title>
    </ion-card-header>


    <div *ngIf="skill?.['cd'] || skill?.['type']" class="displays-around-center margin-top-20">
      <ion-chip> <ion-icon name="time-outline"></ion-icon> {{ skill?.['cd'] }} s</ion-chip>
      <ion-chip> <ion-icon name="flash-outline"></ion-icon> {{ skill?.['type'] }}</ion-chip>
    </div>

    <div class="displays-center" *ngIf="skill?.description || skill?.rsb?.true_desc">
      <div class="padding-20">
        {{ (skill?.description || skill?.rsb?.true_desc) }}
      </div>
    </div>

    <ng-container *ngIf="i === 0 && !!skill?.passive2_name">
      <ion-card-header >
        <ion-card-title class="text-color-light span-bold">
          <div class="displays-start">
            <ion-avatar>
              <ion-img [src]="_core.imageUrl(pokemon?.name, skill?.passive2_name)" (ionError)="errorImage($event)"></ion-img>
            </ion-avatar>
            <div>
              <div>{{ skill?.name }}</div>
              <div class="font-medium">{{ skill?.ability }}</div>
            </div>
          </div>
        </ion-card-title>
      </ion-card-header>

      <div class="displays-center" *ngIf="skill?.passive2_description">
        <div class="padding-20">
          {{ skill?.passive2_description }}
        </div>
      </div>
    </ng-container>

    <div *ngIf="skill?.['upgrades']?.length > 0" class="displays-around-center">
      <ion-card class="upgrade-cards" *ngFor="let upgrade of skill?.['upgrades']; trackBy: trackById">
        <ion-card-header>
          <ion-card-title *ngIf="skill?.name" class="text-color-light span-bold">
            <div class="displays-start">
              <ion-avatar>
                <ion-img [src]="_core.imageUrl(pokemon?.name, upgrade?.name)" (ionError)="errorImage($event)"></ion-img>
              </ion-avatar>
              <div>
                <div>{{ upgrade?.name }}</div>
                <div class="font-medium">{{ 'COMMON.LV' | translate }}{{ upgrade?.level1 }}</div>
              </div>
            </div>
          </ion-card-title>
        </ion-card-header>

        <div *ngIf="upgrade?.['cd'] || upgrade?.['type']" class="displays-around-center margin-top-20">
          <ion-chip> <ion-icon name="time-outline"></ion-icon> {{ upgrade?.cd1 }} s</ion-chip>
          <ion-chip> <ion-icon name="flash-outline"></ion-icon> {{ upgrade?.type }}</ion-chip>
        </div>

        <div class="displays-center" *ngIf="skill?.description || upgrade?.rsb?.true_desc">
          <div class="padding-20">
            {{ (upgrade?.description1 || upgrade?.rsb?.true_desc) }}
            <hr>
            {{ upgrade?.description2 || upgrade?.rsb?.enhanced_true_desc }}
          </div>
        </div>
      </ion-card>
    </div>

  </ion-card>
  `,
  styleUrls: ['./abilities.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AbilitiesComponent {

  trackById = trackById;
  errorImage = errorImage;
  @Input() pokemon: Partial<Pokemon>;


  constructor(
    public _core: CoreConfigService
  ) { }


  // ngOnChanges(): void{
  //   console.log(this.pokemon?.skills)
  // }
}
