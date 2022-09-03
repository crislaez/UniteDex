import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { fromBattleItem } from '@uniteDex/shared/battle-item';
import { BattleItem } from '@uniteDex/shared/battle-item/models/index';
import { fromBuildItem } from '@uniteDex/shared/build-item';
import { BuildItem } from '@uniteDex/shared/build-item/models/index';
import { EntityStatus } from '@uniteDex/shared/models';
import { fromPokemon, Pokemon, PokemonActions } from '@uniteDex/shared/pokemon';
import { emptyObject, gotToTop, trackById } from '@uniteDex/shared/utils/functions';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-tier-list',
  template:`
  <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">

    <div class="empty-header components-background-primary">
      <div class="width-max displays-around-center margin-top-20">
        <ion-chip
          *ngFor="let item of filter; trackBy: trackById"
          [ngStyle]="{'background': item?.key === selectedFilter ? '#312457' : '#724ABC'}"
          (click)="selectedFilter = item?.key">
          {{ item?.literal | translate }}
        </ion-chip>
      </div>
    </div>

    <div class="container components-background-dark">
      <ng-container *ngIf="(getSelectedTierList() | async) as tierList">
        <ng-container *ngIf="(getSelectedStatus() | async) as status">
          <ng-container *ngIf="status !== 'pending'; else loader">
            <ng-container *ngIf="status !== 'error'; else loader">
              <ng-container *ngIf="emptyObject(tierList); else noData">

                <poke-unite-element-card
                  [tierList]="getOrderList(tierList)"
                  [type]="selectedFilter">
                </poke-unite-element-card>

              </ng-container>
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
  styleUrls: ['./tier-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TierListPage {

  gotToTop = gotToTop;
  trackById = trackById;
  emptyObject = emptyObject;
  showButton = false
  @ViewChild(IonContent, {static: true}) content: IonContent;

  filter = [
    {id:1, key:'pokemon', literal:'COMMON.POKEMON'},
    {id:2, key:'battleItem', literal:'COMMON.BATTLE_ITEMS'},
    {id:3, key:'buildItem', literal:'COMMON.BUILD_ITEMS'}
  ];
  selectedFilter = 'pokemon';

  statusTierList$ = this.store.select(fromPokemon.selectStatus);
  statusBattleItems$ = this.store.select(fromBattleItem.selectStatus);
  statusBuildItems$ = this.store.select(fromBuildItem.selectStatus);

  tierList$ = this.store.select(fromPokemon.selectPokemons).pipe(
    map(pokemons => this.getTierLisrtFormat(pokemons))
    // ,tap(d => console.log(d))
  );
  battleItems$ = this.store.select(fromBattleItem.selectBattleItems).pipe(
    map(pokemons => this.getTierLisrtFormat(pokemons))
    // ,tap(d => console.log(d))
  );
  buildItems$ = this.store.select(fromBuildItem.selectBuildItems).pipe(
    map(pokemons => this.getTierLisrtFormat(pokemons))
    // ,tap(d => console.log(d))
  );


  constructor(
    private store: Store,
  ) { }


  // REFRESH
  doRefresh(event) {
    setTimeout(() => {
      this.store.dispatch(PokemonActions.loadPokemons({}))
      event.target.complete();
    }, 500);
  }

  // SCROLL EVENT
  logScrolling({detail:{scrollTop}}): void{
    if(scrollTop >= 300) this.showButton = true
    else this.showButton = false
  }

  getSelectedStatus(): Observable<EntityStatus> {
    return {
      'pokemon': this.store.select(fromPokemon.selectStatus),
      'battleItem': this.store.select(fromBattleItem.selectStatus),
      'buildItem': this.store.select(fromBuildItem.selectStatus)
    }?.[this.selectedFilter] || this.store.select(fromPokemon.selectStatus);
  }

  getSelectedTierList(): Observable<any> { //Observable<{[key:string]:(Pokemon | BattleItem | BuildItem)[]}>
    const selecetedlist$: Observable<any> = this.selectedFilter === 'pokemon'
                         ? this.store.select(fromPokemon.selectPokemons)
                         : this.selectedFilter === 'battleItem'
                         ? this.store.select(fromBattleItem.selectBattleItems)
                         : this.selectedFilter === 'buildItem'
                         ? this.store.select(fromBuildItem.selectBuildItems)
                         : this.store.select(fromPokemon.selectPokemons);

    return selecetedlist$.pipe(
      map(pokemons => this.getTierLisrtFormat(pokemons))
      // ,tap(d => console.log(d))
    );
  }

  getTierLisrtFormat(items: (Pokemon | BuildItem | BattleItem)[]): {[key:string]: (Pokemon | BuildItem | BattleItem)[]} {
    return (items || [])?.reduce((acc, element) => {
      const { tier = null} = element || {}
      return {
        ...(acc ?? {}),
        ...(!!tier
            ? {
              [tier]:[
                ...(acc[tier] ?? []),
                ...(element ? [element] : [])
              ]
            }
            : {}
          )
      }
    },{});
  }

  getOrderList(list:any): {[key:string]:(Pokemon | BattleItem | BuildItem)[]} {
    // console.log(list)
    const { S = null,  ...rest } = list || {};

    return {
      ...(S ? {S} : {}),
      ...(rest ?? {})
    };
  }



}
