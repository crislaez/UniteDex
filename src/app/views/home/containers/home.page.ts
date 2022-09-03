import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { IonContent, Platform } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { BattleItemActions } from '@uniteDex/shared/battle-item';
import { BuildItemActions } from '@uniteDex/shared/build-item';
import { PokemonActions } from '@uniteDex/shared/pokemon';
import { gotToTop, trackById } from '@uniteDex/shared/utils/functions';
import * as fromHome from '../selectors/home.selectors';

@Component({
  selector: 'poke-unite-home',
  template:`
  <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">

    <div class="empty-header components-background-primary">
    </div>

    <div class="container components-background-dark">
      <ng-container *ngIf="(homeSelector$ | async) as homeSelector">
        <ng-container *ngFor="let item of iteratable; trackBy: trackById">
          <poke-unite-swiper
            [title]="item?.title"
            [items]="(homeSelector?.[item?.element] || [])"
            [status]="homeSelector?.[item?.status]"
            [hash]="item?.element"
            [type]="item?.type"
            [showMore]="true">
          </poke-unite-swiper>
        </ng-container>
      </ng-container>

      <!-- REFRESH -->
      <ion-refresher slot="fixed" (ionRefresh)="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
    </div>

    <!-- TO TOP BUTTON  -->
    <ion-fab *ngIf="showButton" vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button class="color-button-text" (click)="gotToTop(content)"> <ion-icon name="arrow-up-circle-outline"></ion-icon></ion-fab-button>
    </ion-fab>
  </ion-content>
  `,
  styleUrls: ['./home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {

  gotToTop = gotToTop;
  trackById = trackById;
  @ViewChild(IonContent, {static: true}) content: IonContent;
  showButton = false
  homeSelector$ = this.store.select(fromHome.selectHomeInit);

  iteratable = [
    {id:1, title:'COMMON.POKEMON', element:'pokemon', status:'pokemonStatus', type:'pokemon' },
    {id:2, title:'COMMON.BUILD_ITEMS', element:'buildItem', status:'buildStatus', type:'buildItem' },
    {id:3, title:'COMMON.BATTLE_ITEMS', element:'battleItem', status:'battleStatus', type:'battleItem' }
  ];


  constructor(
    private store: Store,
    public platform: Platform,
  ) { }


  // REFRESH
  doRefresh(event) {
    setTimeout(() => {
      this.store.dispatch(PokemonActions.loadPokemons({filters:{}}));
      this.store.dispatch(BuildItemActions.loadBuildItems({filters:{}}));
      this.store.dispatch(BattleItemActions.loadBattleItems({filters:{}}));

      event.target.complete();
    }, 500);
  }

  // SCROLL EVENT
  logScrolling({detail:{scrollTop}}): void{
    if(scrollTop >= 300) this.showButton = true
    else this.showButton = false
  }


}
