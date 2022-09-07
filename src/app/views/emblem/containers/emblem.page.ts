import { ChangeDetectionStrategy, Component, EventEmitter, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Keyboard } from '@capacitor/keyboard';
import { IonContent, ModalController, Platform } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { CoreConfigService } from '@uniteDex/core/services/core-config.service';
import { EmblemActions } from '@uniteDex/shared/emblem';
import { Emblem, EmblemColor } from '@uniteDex/shared/emblem/models/index';
import { emptyObject, errorImage, getEmblemColors, getObjectKeys, gotToTop, trackById } from '@uniteDex/shared/utils/functions';
import { map, switchMap, tap, shareReplay } from 'rxjs/operators';
import { EmblemDetailModalComponent } from '../components/emblem-detail-modal.component';
import * as fromEmblem from '../selectors/emblem.selectors';

@Component({
  selector: 'app-emblem',
  template: `
  <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">

    <div class="empty-header components-background-primary">
      <!-- FORM  -->
      <div class="search-wrapper displays-center">
        <ng-container *ngIf="(info$ | async) as info">
          <ng-container *ngIf="!['pending', 'error'].includes(info?.status)">
            <form (submit)="searchSubmit($event)">
              <ion-searchbar [placeholder]="'COMMON.BY_NAME' | translate" [formControl]="search" (ionClear)="clearSearch($event)"></ion-searchbar>
            </form>

            <!-- <ion-button class="class-ion-button" (click)="presentModal(pokemonFilters)"><ion-icon name="options-outline"></ion-icon></ion-button> -->
          </ng-container>
        </ng-container>
      </div>
    </div>

    <div class="container components-background-dark">

      <ng-container *ngIf="(info$ | async) as info">
        <ng-container *ngIf="info?.status !== 'pending' || componentStatus?.slice !== perPage; else loader">
          <ng-container *ngIf="info?.status !== 'error'; else serverError">
            <ng-container *ngIf="info?.emblemList?.length > 0; else noData">

              <div class="header">
              </div>

              <ng-container *ngIf="info?.emblemList?.length > 0; else noData">
                <ng-container *ngFor="let emblem of info?.emblemList; trackBy: trackById">
                  <div class="div-avatar">
                    <ion-avatar slot="start" (click)="openPokemondModal(emblem, info?.emblems, info?.emblemsColors)">
                      <ion-img loading="lazy" [src]="_core.getEmblemUrl +'pokedex/'+ emblem?.name +'.png'" [alt]="emblem?.name" (ionError)="errorImage($event)"></ion-img>
                    </ion-avatar>

                    <div class="emblem-color displays-center">
                      <ion-img *ngFor="let color of getEmblemColors(emblem)" loading="lazy" [src]="_core.getEmblemUrl +'sets/'+ color +'.png'" [alt]="color" (ionError)="errorImage($event)"></ion-img>
                    </div>
                  </div>
                </ng-container>
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
  getEmblemColors = getEmblemColors;
  @ViewChild(IonContent, {static: true}) content: IonContent;
  showButton = false;
  search = new FormControl('');
  perPage = 15;

  trigger = new EventEmitter<{slice:number, filters:any, refresh:boolean}>();
  componentStatus: {slice:number, filters:any, refresh:boolean} = {
    slice: this.perPage,
    filters:{},
    refresh: false,
  };

  info$ = this.trigger.pipe(
    tap(({refresh}) => {
      if(refresh) this.store.dispatch(EmblemActions.initLoadEmblem());
    }),
    switchMap(({slice, filters}) =>
      this.store.select(fromEmblem.selectEmblemInit).pipe(
        map((info) => {
          const {emblemList = null} = info || {};
          const { name = null } = filters || {};

          const list = !!name
                    ? (emblemList || [])?.filter(({display_name}) => display_name?.toLocaleLowerCase() === name || display_name?.toLocaleLowerCase()?.includes(name))
                    : [...emblemList];
          return {
            ...info,
            emblemList: (list || [])?.slice(0, slice),
            total: list?.length
          }
        })
      )
    )
    // ,tap(d => console.log(d))
    ,shareReplay(1)
  );


  constructor(
    private store: Store,
    public platform: Platform,
    public _core: CoreConfigService,
    public modalController: ModalController,
  ) { }


  ionViewWillEnter(): void{
    this.trigger.next(this.componentStatus)
  }

  // REFRESH
  doRefresh(event) {
    setTimeout(() => {
      this.componentStatus = {
        slice: this.perPage,
        filters:{},
        refresh: true,
      };
      this.trigger.next(this.componentStatus);
      event.target.complete();
    }, 500);
  }

  // SEARCH
  searchSubmit(event: Event): void{
    event.preventDefault();
    if(!this.platform.is('mobileweb')) Keyboard.hide();
    this.componentStatus = {
      ...this.componentStatus,
      slice: this.perPage,
      filters:{...this.componentStatus?.filters, name:this.search.value?.toLowerCase() },
      refresh:false
    };
    this.trigger.next(this.componentStatus);
  }

  // CLEAR
  clearSearch(event): void{
    if(!this.platform.is('mobileweb')) Keyboard.hide();
    this.search.reset();
    this.componentStatus = {
      ...this.componentStatus,
      slice: this.perPage,
      filters:{...this.componentStatus.filters, name: '' },
      refresh:false
    };
    this.trigger.next(this.componentStatus);
  }

  // INIFINITE SCROLL
  loadData({event, total}) {
    setTimeout(() => {
      this.componentStatus = {
        ...this.componentStatus,
        slice: this.componentStatus.slice + this.perPage,
        refresh: false,
      };
      this.trigger.next(this.componentStatus);
      event.target.complete();
    },500)
  }

  // SHOW SINGLE CARD
  async openPokemondModal(emblem: Emblem, emblemList: Emblem[], emblemsColors:EmblemColor[]) {
    const selectedEmblems = (emblemList || [])?.filter(({display_name}) => display_name === emblem?.display_name);
    const [ firstEmblem = null ] = selectedEmblems || [];
    const allcolors = getEmblemColors(firstEmblem);
    const selectColors = (emblemsColors || [])?.filter(({name}) => allcolors?.includes(name))

    const modal = await this.modalController.create({
      component: EmblemDetailModalComponent,
      componentProps:{
        selectedEmblems,
        selectColors
      }
    });
    return await modal.present();
  }

  // SCROLL EVENT
  logScrolling({detail:{scrollTop}}): void{
    if(scrollTop >= 300) this.showButton = true
    else this.showButton = false
  }



}
