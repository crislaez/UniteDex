import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { IonContent, ModalController } from '@ionic/angular';
import { CoreConfigService } from '@uniteDex/core/services/core-config.service';
import { Emblem, EmblemColor } from '@uniteDex/shared/emblem';
import { errorImage, getEmblemColors, getObjectKeys, gotToTop, replaceLowBar, trackById } from '@uniteDex/shared/utils/functions';

@Component({
  selector: 'app-emblem-detail-modal',
  template: `
    <!-- HEADER  -->
    <ion-header class="ion-no-border components-background-dark">
      <ion-toolbar>
        <ion-title class="text-color-light big-size" > {{ selectedEmblems?.[0]?.display_name }} </ion-title>
        <ion-buttons class="text-color-dark" slot="end">
          <ion-button (click)="dismiss()"><ion-icon fill="clear" class="text-color-light" name="close-outline"></ion-icon></ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <!-- MAIN  -->
    <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">
      <div class="container components-background-dark">
        <div class="header">
        </div>

        <ng-container *ngIf="selectedEmblems?.length > 0; else noData">
          <ion-card class="emblem-image-card components-background-eighthiary"
            *ngFor="let emblem of reverseSelectEmblems; trackBy: trackById">
            <div class="div-avatar">
              <ion-avatar slot="start">
                <ion-img loading="lazy" [src]="_core.getEmblemUrl +'pokedex/'+ emblem?.name +'.png'" [alt]="emblem?.name" (ionError)="errorImage($event)"></ion-img>
              </ion-avatar>

              <div class="emblem-color displays-center">
                <ion-img *ngFor="let color of getEmblemColors(emblem)" loading="lazy" [src]="_core.getEmblemUrl +'sets/'+ color +'.png'" [alt]="color" (ionError)="errorImage($event)"></ion-img>
              </div>
            </div>

            <div class="displays-around-center">
              <ng-container *ngFor="let stat of emblem?.stats; trackBy: trackById">
                <ng-container *ngFor="let statKey of getObjectKeys(stat); trackBy: trackById">
                  <div class="width-40 padding-top-bottom-5 capital-letter">{{ replaceLowBar(statKey) }}:</div>
                  <div class="width-40 padding-top-bottom-5" [ngStyle]="{'color': stat?.[statKey] < 0 ? 'red' : '#7FFF7F'}">{{ stat?.[statKey] }}</div>
                </ng-container>
              </ng-container>
            </div>
          </ion-card>

          <ion-card class="emblem-info-card components-background-eighthiary"
            *ngFor="let color of selectColors; trackBy: trackById">
            <div class="displays-around-center">
              <div class="width-25 padding-top-bottom-5 capital-letter">
                <div class="circle displays-center" [ngStyle]="{'background':color?.name, 'text-shadow':'1px 1px 1px black'}">
                  <div>{{ color?.count1 }}</div>
                </div>
              </div>
              <div class="width-65 padding-top-bottom-5">{{ color?.bonus1 }} % {{ color?.stat_desc }}</div>

              <div class="width-25 padding-top-bottom-5 capital-letter">
                <div class="circle displays-center" [ngStyle]="{'background':color?.name, 'text-shadow':'1px 1px 1px black'}">
                  <div>{{ color?.count2 }}</div>
                </div>
              </div>
              <div class="width-65 padding-top-bottom-5">{{ color?.bonus2 }} % {{ color?.stat_desc }}</div>

              <div class="width-25 padding-top-bottom-5 capital-letter">
                <div class="circle displays-center" [ngStyle]="{'background':color?.name, 'text-shadow':'1px 1px 1px black'}">
                  <div>{{ color?.count3 }}</div>
                </div>
              </div>
              <div class="width-65 padding-top-bottom-5">{{ color?.bonus3 }} % {{ color?.stat_desc }}</div>
            </div>
          </ion-card>
        </ng-container>
      </div>

      <!-- IS NO DATA  -->
      <ng-template #noData>
        <poke-unite-no-data [title]="'COMMON.NORESULT'" [image]="'assets/images/empty.png'" [top]="'15vh'"></poke-unite-no-data>
      </ng-template>

      <!-- TO TOP BUTTON  -->
      <ion-fab *ngIf="showButton" vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button class="color-button-text" (click)="gotToTop(content)"> <ion-icon name="arrow-up-circle-outline"></ion-icon></ion-fab-button>
      </ion-fab>

    </ion-content>
  `,
  styleUrls: ['./emblem-detail-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmblemDetailModalComponent {

  gotToTop = gotToTop;
  trackById = trackById;
  errorImage = errorImage;
  replaceLowBar = replaceLowBar;
  getObjectKeys = getObjectKeys;
  getEmblemColors = getEmblemColors;
  @ViewChild(IonContent) content: IonContent;
  @Input() selectedEmblems: Emblem[];
  @Input() selectColors: EmblemColor[];
  showButton = false;


  constructor(
    public _core: CoreConfigService,
    private modalController: ModalController
  ) { }


  // SCROLL EVENT
  logScrolling({detail:{scrollTop}}): void{
    if(scrollTop >= 300) this.showButton = true
    else this.showButton = false
  }

  // CLOSE MODAL
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  get reverseSelectEmblems() {
    return [...(this.selectedEmblems ?? [])]?.reverse();
  }



}
