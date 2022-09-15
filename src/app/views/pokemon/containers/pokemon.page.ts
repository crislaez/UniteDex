import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { CoreConfigService } from '@uniteDex/core/services/core-config.service';
import { PokemonActions } from '@uniteDex/shared/pokemon';
import { StatsActions } from '@uniteDex/shared/stat';
import { emptyObject, errorImage, getObjectKeys, gotToTop, trackByFn } from '@uniteDex/shared/utils/functions';
import { switchMap } from 'rxjs/operators';
import * as fromPokemonPage from '../selectors/pokemon.selectors';

@Component({
  selector: 'poke-unite-pokemon',
  template:`
  <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">

    <div class="empty-header components-background-primary">
    </div>

    <div class="container components-background-dark">
      <ng-container *ngIf="(info$ | async) as info">
        <ng-container *ngIf="info?.status !== 'pending'; else loader">
          <ng-container *ngIf="info?.status !== 'error'; else serverError">
            <ng-container *ngIf="emptyObject(info?.pokemon); else noData">

              <div class="width-max displays-center">
                <ion-avatar class="pokemon-principal-image" slot="start">
                  <ion-img loading="lazy" [src]="_core.imageUrl('pokemon',info?.pokemon?.['name'])" loading="lazy" (ionError)="errorImage($event)"></ion-img>
                </ion-avatar>
              </div>

              <div class="width-max displays-around-center margin-top-20">
                <ion-chip *ngFor="let item of getObjectKeys(info?.pokemon?.['tags']); trackBy: trackByFn">{{ info?.pokemon?.['tags']?.[item] }}</ion-chip>
              </div>

              <div class="displays-center margin-top-10">
                <ion-chip *ngIf="info?.pokemon?.['damage_type'] as damage_type" class="attack">{{ damage_type }} {{ 'COMMON.ATTACKER' | translate }}</ion-chip>
              </div>

              <ion-segment scrollable (ionChange)="segmentChanged($any($event))" [(ngModel)]="selected">
                <ion-segment-button *ngFor="let item of itemsSegments; trackBy: trackByFn; let i = index;" [value]="item?.id" class="text-color-light">
                  <ion-label class="capital-letter">{{ item?.label | translate }}</ion-label>
                </ion-segment-button>
              </ion-segment>

              <poke-unite-abilities
                *ngIf="selected === options?.abilities"
                [pokemon]="info?.pokemon">
              </poke-unite-abilities>

              <poke-unite-info
                *ngIf="selected === options?.info"
                [pokemon]="info?.pokemon">
              </poke-unite-info>

              <poke-unite-builds
                *ngIf="selected === options?.builds"
                [pokemon]="info?.pokemon">
              </poke-unite-builds>

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
  styleUrls: ['./pokemon.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonPage {

  gotToTop = gotToTop;
  trackByFn = trackByFn;
  errorImage = errorImage;
  emptyObject = emptyObject;
  getObjectKeys = getObjectKeys;
  showButton = false
  @ViewChild(IonContent, {static: true}) content: IonContent;

  info$ = this.route.params.pipe(
    switchMap(({pokemonName}) =>
      this.store.select(fromPokemonPage.selectPokemonInit(pokemonName))
    )
  );


  selected = 1;
  itemsSegments = [
    {id:1, label:'COMMON.ABILITIES'},
    {id:2, label:'COMMON.INFO'},
    {id:3, label:'COMMON.BUILDS'},
  ];

  options = {
    abilities:1,
    info:2,
    builds:3,
  };

  @HostListener('document:ionBackButton', ['$event'])
  private overrideHardwareBackAction($event) {
    $event.detail.register(100, () => this.location.back());
  }


  constructor(
    private store: Store,
    private location: Location,
    private route: ActivatedRoute,
    public _core: CoreConfigService
  ) { }


  // REFRESH
  doRefresh(event) {
    setTimeout(() => {
      this.store.dispatch(PokemonActions.loadPokemons({}))
      this.store.dispatch(StatsActions.loadStats())
      event.target.complete();
    }, 500);
  }

  // SCROLL EVENT
  logScrolling({detail:{scrollTop}}): void{
    if(scrollTop >= 300) this.showButton = true
    else this.showButton = false
  }

  segmentChanged({detail:{value}}): void{
    this.selected = Number(value);
  }


}
