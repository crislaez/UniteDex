import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CoreConfigService } from '@uniteDex/core/services/core-config.service';
import { Pokemon, Skill } from '@uniteDex/shared/pokemon/models';
import { StatLevel } from '@uniteDex/shared/stat/models';
import { errorImage, trackByFn } from '@uniteDex/shared/utils/functions';

@Component({
  selector: 'poke-unite-abilities',
  template:`
  <ion-card *ngFor="let skill of pokemon?.skills; let i = index; trackBy: trackByFn"
    class="text-color-light components-background-eighthiary margin-top-20">

    <ion-card-header>
      <ion-card-title *ngIf="skill?.name" class="text-color-light span-bold">
        <div class="displays-start">
          <ion-avatar>
            <ion-img [src]="_core.imageUrl(pokemon?.name, getSkillName(skill?.name))" (ionError)="errorImage($event)"></ion-img>
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

    <ng-container *ngIf="i <= 1 && getExistFields(skill)">
      <ng-container *ngFor="let index of getCountElement(skill); trackBy: trackByFn">
        <ion-card-header >
          <ion-card-title class="text-color-light span-bold">
            <div class="displays-start">
              <ion-avatar>
                <ion-img [src]="_core.imageUrl(pokemon?.name, getSkillName( ( i === 0 ? skill?.['passive'+(index + 2)+'_name'] : skill?.['basic'+(index + 2)+'_name'] ) ))" (ionError)="errorImage($event)"></ion-img>
              </ion-avatar>
              <div>
                <div>{{ i === 0 ? skill?.['passive'+(index + 2)+'_name'] : skill?.['basic'+(index + 2)+'_name'] }}</div>
                <div class="font-medium">{{ skill?.ability }}</div>
              </div>
            </div>
          </ion-card-title>
        </ion-card-header>

        <div class="displays-center" >
          <div class="padding-20">
            {{ i === 0 ? skill?.['passive'+(index + 2)+'_description'] : skill?.['basic'+(index + 2)+'_description'] }}
          </div>
        </div>
      </ng-container>
    </ng-container>

    <div *ngIf="skill?.['upgrades']?.length > 0" class="displays-around-center">
      <ion-card class="upgrade-cards" *ngFor="let upgrade of skill?.['upgrades']; trackBy: trackByFn">
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

  trackByFn = trackByFn;
  errorImage = errorImage;
  @Input() pokemon: Partial<Pokemon & {stats: StatLevel[]}>;
  extraAbilities = ['passive2_name', 'passive3_name', 'basic2_name', 'basic3_name']; //TODO


  constructor(
    public _core: CoreConfigService
  ) { }


  getCountElement(skill: Skill): number[] {
    const length = Object.keys(skill || {})?.filter(item => item?.includes('_name'))?.length || 0;
    return (new Array(length).fill(0) || [])?.map((_,index) => index)
  }

  getExistFields(skill: Skill): any{
    return Object.keys(skill || {})?.some(item => this.extraAbilities?.includes(item));
  }

  getSkillName(skill:string): string {
    return skill?.includes('Attack') && skill !== 'Quick Attack'
            ? 'Attack'
            : skill
  }


}
