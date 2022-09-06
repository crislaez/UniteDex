import { IonContent } from '@ionic/angular';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { gotToTop } from '@uniteDex/shared/utils/functions';

@Component({
  selector: 'app-emblem-detail-modal',
  template: `
    <!-- HEADER  -->
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-buttons class="text-color-dark" slot="end">
          <ion-button (click)="dismiss()"><ion-icon fill="clear" class="text-color-light" name="close-outline"></ion-icon></ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <!-- MAIN  -->
    <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">
      <div class="pokemon-banner">
        <div class="pokemon-banner-name displays-around">
          <!-- <div class="capital-letter">
            {{ clearName(pokemon?.name) }}
          </div>
          <div>
            # {{getPokemonPokedexNumber(statusComponent?.url)}}
          </div> -->
        </div>

        <div class="pokemon-banner-type">
          <!-- <ion-chip *ngFor="let type of getPokemonTypes(pokemon)"
            [ngStyle]="{'box-shadow':type?.name === 'dark' ? '0px 0px 10px white' : '0px 0px 10px gray' }"
            [ngClass]="type?.name"
            (click)="openTypeModal(type)">

            <ion-label>{{ type?.name }}</ion-label>
          </ion-chip> -->
        </div>
      </div>

      <div class="container components-background-dark" >
        <!-- <div class="width-max displays-center">
          <ion-avatar class="pokemon-principal-image" slot="start">
            <img loading="lazy" [src]="getPokemonImage(pokemon)" [alt]="pokemon?.name" (error)="errorImage($event)">
          </ion-avatar>
        </div> -->


        <!-- REFRESH -->
        <!-- <ion-refresher slot="fixed" (ionRefresh)="doRefresh($event)">
          <ion-refresher-content></ion-refresher-content>
        </ion-refresher> -->
      </div>

      <!-- TO TOP BUTTON  -->
      <ion-fab *ngIf="showButton" vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button class="color-button-text" (click)="gotToTop(content)"> <ion-icon name="arrow-up-circle-outline"></ion-icon></ion-fab-button>
      </ion-fab>
    </ion-content>


    <!-- IS ERROR -->
    <!-- <ng-template #serverError>
      <app-empty-modal [title]="'COMMON.ERROR'" (dismiss)="dismiss()" [image]="'assets/images/error.png'" [top]="'30vh'"> </app-empty-modal>
    </ng-template> -->

    <!-- IS NO DATA  -->
    <!-- <ng-template #noData>
      <app-empty-modal [title]="'COMMON.NORESULT'" (dismiss)="dismiss()" [image]="'assets/images/empty.png'" [top]="'30vh'"> </app-empty-modal>
    </ng-template> -->

    <!-- LOADER  -->
    <!-- <ng-template #loader>
      <ion-header class="ion-no-border" >
      </ion-header>
      <ion-content>
        <app-spinner [top]="'75%'"></app-spinner>
      </ion-content>
    </ng-template> -->
  `,
  styleUrls: ['./emblem-detail-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmblemDetailModalComponent {

  gotToTop = gotToTop;
  @ViewChild(IonContent) content: IonContent;
  showButton = false;


  constructor(
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


}
