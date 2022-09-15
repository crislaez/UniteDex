import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { trackByFn } from '@uniteDex/shared/utils/functions';

@Component({
  selector: 'poke-unite-filter-modal',
  template:`
  <ion-content class="modal-wrapper components-background-eighthiary">
    <ion-header translucent class="ion-no-border  components-color-third">
      <ion-toolbar>
        <ion-buttons slot="end">
          <ion-button fill="clear" (click)="dismissModal()"><ion-icon name="close-outline"></ion-icon></ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <div class="displays-around modal-container">
      <ion-item *ngIf="damageTypes?.length > 0" class="item-select font-medium">
        <ion-label>{{'COMMON.DAMAGE' | translate}}</ion-label>
        <ion-select (ionChange)="changeFilter('damageType', $any($event))" [value]="selectedFilters?.damageType" interface="action-sheet">
          <ion-select-option value="0">{{ 'COMMON.EVERYONE' | translate }}</ion-select-option>
          <ion-select-option *ngFor="let damage of damageTypes; trackBy: trackByFn" [value]="damage">{{ damage }}</ion-select-option>
        </ion-select>
      </ion-item>

      <ion-item *ngIf="difficulties?.length > 0" class="item-select font-medium">
        <ion-label>{{'COMMON.DIFFICULTY' | translate}}</ion-label>
        <ion-select (ionChange)="changeFilter('difficulty', $any($event))" [value]="selectedFilters?.difficulty" interface="action-sheet">
          <ion-select-option value="0">{{ 'COMMON.EVERYONE' | translate }}</ion-select-option>
          <ion-select-option *ngFor="let difficulty of difficulties; trackBy: trackByFn" [value]="difficulty">{{ difficulty }}</ion-select-option>
        </ion-select>
      </ion-item>

      <ion-item *ngIf="ranges?.length > 0" class="item-select font-medium">
        <ion-label>{{'COMMON.RANGE' | translate}}</ion-label>
        <ion-select (ionChange)="changeFilter('range', $any($event))" [value]="selectedFilters?.range" interface="action-sheet">
          <ion-select-option value="0">{{ 'COMMON.EVERYONE' | translate }}</ion-select-option>
          <ion-select-option *ngFor="let range of ranges; trackBy: trackByFn" [value]="range">{{ range }}</ion-select-option>
        </ion-select>
      </ion-item>

      <ion-item *ngIf="roles?.length > 0" class="item-select font-medium">
        <ion-label>{{'COMMON.ROLES' | translate}}</ion-label>
        <ion-select (ionChange)="changeFilter('role', $any($event))" [value]="selectedFilters?.role" interface="action-sheet">
          <ion-select-option value="0">{{ 'COMMON.EVERYONE' | translate }}</ion-select-option>
          <ion-select-option *ngFor="let role of roles; trackBy: trackByFn" [value]="role">{{ role }}</ion-select-option>
        </ion-select>
      </ion-item>

      <ion-item *ngIf="colorsFilter?.length > 0" class="item-select font-medium">
        <ion-label>{{'COMMON.COLORS' | translate}}</ion-label>
        <ion-select (ionChange)="changeFilter('color', $any($event))" [value]="selectedFilters?.color" interface="action-sheet">
          <ion-select-option value="0">{{ 'COMMON.EVERYONE' | translate }}</ion-select-option>
          <ion-select-option *ngFor="let color of colorsFilter; trackBy: trackByFn" [value]="color">{{ color }}</ion-select-option>
        </ion-select>
      </ion-item>
    </div>
  </ion-content>
  `,
  styleUrls: ['./filter-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterModalComponent {

  trackByFn = trackByFn;
  @Input() damageTypes: string[];
  @Input() difficulties: string[];
  @Input() ranges: string[];
  @Input() roles: string[];
  @Input() colorsFilter: string[];
  @Input() selectedFilters: any;


  constructor(
    public modalController: ModalController
  ) { }


  dismissModal() {
    this.modalController.dismiss(false);
  }

  changeFilter(field: string,{detail: {value}}): void {
    this.modalController.dismiss({
      ...(this.selectedFilters ?? {}),
      ...(value !== '0' || !value ? {[field]:value} : {[field]:null})
    });
  }


}
