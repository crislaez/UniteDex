import { ChangeDetectionStrategy, Component, ViewChild, EventEmitter } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { CoreConfigService } from '@uniteDex/core/services/core-config.service';
import { EmblemActions } from '@uniteDex/shared/emblem';
import { emptyObject, errorImage, getObjectKeys, gotToTop, trackById } from '@uniteDex/shared/utils/functions';
import { tap, switchMap, map, startWith } from 'rxjs/operators';
import * as fromEmblem from '../selectors/emblem.selectors';

@Component({
  selector: 'app-emblem',
  template: `
  <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">

    <div class="empty-header components-background-primary">
      <!-- FORM  -->
      <div class="search-wrapper displays-center">
        <!-- <ng-container  *ngIf="!['pending', 'error'].includes((status$ | async))">
          <form (submit)="searchSubmit($event)">
            <ion-searchbar [placeholder]="'COMMON.BY_NAME' | translate" [formControl]="search" (ionClear)="clearSearch($event)"></ion-searchbar>
          </form>

          <ng-container *ngIf="componentStatus?.option === 'pokemon'">
            <ion-button *ngIf="pokemonFilters$ | async as pokemonFilters" class="class-ion-button" (click)="presentModal(pokemonFilters)"><ion-icon name="options-outline"></ion-icon></ion-button>
          </ng-container>
        </ng-container> -->
      </div>
    </div>

    <div class="container components-background-dark">

      <ng-container *ngIf="(info$ | async) as info">
        <ng-container *ngIf="info?.status !== 'pending' || componentStatus?.slice !== perPage; else loader">
          <ng-container *ngIf="info?.status !== 'error'; else serverError">
            <ng-container *ngIf="info?.emblemList?.length > 0; else noData">

              <div class="header">
              </div>

              <ng-container *ngFor="let emblem of info?.emblemList; trackBy: trackById">
                <ion-avatar slot="start">
                  <ion-img loading="lazy" [src]="_core.getEmblemUrl +'pokedex/'+ emblem?.name +'.png'" [alt]="emblem?.name" (ionError)="errorImage($event)"></ion-img>
                  <!-- <ion-img loading="lazy" [src]="_core.getEmblemUrl +'pokedex/'+ emblem?.name +'.png'" [alt]="emblem?.name" (ionError)="errorImage($event)"></ion-img> -->
                </ion-avatar>
              </ng-container>

              <poke-unite-infinite-scroll
                [status]="info?.status"
                [slice]="componentStatus?.slice"
                [total]="info?.total"
                (loadDataTrigger)="loadData($event)">
              </poke-unite-infinite-scroll>

            </ng-container>
          </ng-container>
        </ng-container>
      </ng-container>

      <!-- REFRESH -->
      <ion-refresher slot="fixed" (ionRefresh)="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <!-- IS ERROR -->
      <ng-template #serverError>
        <poke-unite-no-data [title]="'COMMON.ERROR'" [image]="'assets/images/error.png'" [top]="'15vh'"></poke-unite-no-data>
      </ng-template>

      <!-- IS NO DATA  -->
      <ng-template #noData>
        <poke-unite-no-data [title]="'COMMON.NORESULT'" [image]="'assets/images/empty.png'" [top]="'15vh'"></poke-unite-no-data>
      </ng-template>

      <!-- LOADER  -->
      <ng-template #loader>
        <poke-unite-spinner [top]="'65%'"></poke-unite-spinner>
      </ng-template>
    </div>

    <!-- TO TOP BUTTON  -->
    <ion-fab *ngIf="showButton" vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button class="color-button-text" (click)="gotToTop(content)"> <ion-icon name="arrow-up-circle-outline"></ion-icon></ion-fab-button>
    </ion-fab>
  </ion-content>
  `,
  styleUrls: ['./emblem.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmblemPage {

  gotToTop = gotToTop;
  trackById = trackById;
  errorImage = errorImage;
  emptyObject = emptyObject;
  getObjectKeys = getObjectKeys;
  @ViewChild(IonContent, {static: true}) content: IonContent;
  showButton = false
  perPage = 15;

  trigger = new EventEmitter<{slice:number, filters:any}>();
  componentStatus: {slice:number, filters:any} = {
    slice: this.perPage,
    filters:{},
  };
  info$ = this.trigger.pipe(
    switchMap(({slice, filters}) =>
      this.store.select(fromEmblem.selectEmblemInit).pipe(
        map(info => {
          const {emblemList = null} = info || {}
          return {
            ...info,
            emblemList: (emblemList || [])?.slice(0, slice),
            total: emblemList?.length
          }
        })
      )
    )
    ,tap(d => console.log(d))
  );


  constructor(
    private store: Store,
    public _core: CoreConfigService
  ) {
    console.log(this._core.getEmblemUrl)
  }


  ionViewWillEnter(): void{
    this.trigger.next(this.componentStatus)
  }

  // REFRESH
  doRefresh(event) {
    setTimeout(() => {
      this.store.dispatch(EmblemActions.initLoadEmblem());
      event.target.complete();
    }, 500);
  }

  // INIFINITE SCROLL
  loadData({event, total}) {
    setTimeout(() => {
      this.componentStatus = {
        ...this.componentStatus,
        slice: this.componentStatus.slice + this.perPage,
      };
      this.trigger.next(this.componentStatus);
      event.target.complete();
    },500)
  }

  // SCROLL EVENT
  logScrolling({detail:{scrollTop}}): void{
    if(scrollTop >= 300) this.showButton = true
    else this.showButton = false
  }



}

// https://d275t8dp8rxb42.cloudfront.net/emblems/001C.png
// https://d275t8dp8rxb42.cloudfront.net/emblems/pokedex/017A.png
// https://d275t8dp8rxb42.cloudfront.net/emblems/pokedex/018B.png
// https://d275t8dp8rxb42.cloudfront.net/emblems/pokedex/018B.png
// https://d275t8dp8rxb42.cloudfront.net/emblems/pokedex/020A.png
// https://d275t8dp8rxb42.cloudfront.net/emblems/sets/White.png
