import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { BattleItem } from '@uniteDex/shared/battle-item/models/index';
import { BuildItem } from '@uniteDex/shared/build-item/models/index';
import { fromPokemon, Pokemon, PokemonActions } from '@uniteDex/shared/pokemon';
import { emptyObject, gotToTop } from '@uniteDex/shared/utils/functions';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-tier-list',
  template:`
  <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">

    <div class="empty-header components-background-primary">
    </div>

    <div class="container components-background-dark">
      <ng-container *ngIf="(tierList$ | async) as tierList">
        <ng-container *ngIf="(status$ | async) as status">
          <ng-container *ngIf="status !== 'pending'; else loader">
            <ng-container *ngIf="status !== 'error'; else loader">
              <ng-container *ngIf="emptyObject(tierList); else noData">

                <poke-unite-element-card
                  [tierList]="tierList">
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
  emptyObject = emptyObject;
  showButton = false
  @ViewChild(IonContent, {static: true}) content: IonContent;

  status$ = this.store.select(fromPokemon.selectStatus);
  tierList$ = this.store.select(fromPokemon.selectPokemons).pipe(
    map(pokemons => this.getTierLisrtFormat(pokemons))
    ,tap(d => console.log(d))
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


}
