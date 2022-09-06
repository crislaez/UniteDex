import { Location } from '@angular/common';
import { Component, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { CoreConfigService } from '@uniteDex/core/services/core-config.service';
import { BattleItemActions, fromBattleItem } from '@uniteDex/shared/battle-item';
import { emptyObject, errorImage, getObjectKeys, gotToTop, trackById } from '@uniteDex/shared/utils/functions';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-battle-item',
  template:`
  <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">

    <div class="empty-header components-background-primary">
    </div>

    <div class="container components-background-dark">
      <ng-container *ngIf="(battleItem$ | async) as battleItem">
        <ng-container *ngIf="(status$ | async) as status">
          <ng-container *ngIf="status !== 'pending'; else loader">
            <ng-container *ngIf="status !== 'error'; else serverError">
              <ng-container *ngIf="emptyObject(battleItem); else noData">

                <div class="width-max displays-center">
                  <ion-avatar class="pokemon-principal-image" slot="start">
                    <ion-img loading="lazy" [src]="_core.imageUrl('battleItem',battleItem?.['name'])" loading="lazy" (ionError)="errorImage($event)"></ion-img>
                  </ion-avatar>
                </div>

                <div class="displays-center margin-top-10">
                  <ion-chip *ngIf="battleItem?.['damage_type'] as damage_type" class="attack">{{ damage_type }} {{ 'COMMON.ATTACKER' | translate }}</ion-chip>
                </div>

                <poke-unite-battle-item-info
                  [battleItem]="battleItem">
                </poke-unite-battle-item-info>

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
  styleUrls: ['./battle-item.page.scss'],
})
export class BattleItemPage {

  gotToTop = gotToTop;
  trackById = trackById;
  errorImage = errorImage;
  emptyObject = emptyObject;
  getObjectKeys = getObjectKeys;
  showButton = false
  @ViewChild(IonContent, {static: true}) content: IonContent;

  status$ = this.store.select(fromBattleItem.selectStatus);
  battleItem$ = this.route.params.pipe(
    switchMap(({battleItemName}) =>
      this.store.select(fromBattleItem.selectBattleItems).pipe(
        map((allBattleItems) => {
          return (allBattleItems || [])?.find(({name}) => name === battleItemName) || {}
        })
      )
    )
  );

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
      this.store.dispatch(BattleItemActions.loadBattleItems({}))
      event.target.complete();
    }, 500);
  }

  // SCROLL EVENT
  logScrolling({detail:{scrollTop}}): void{
    if(scrollTop >= 300) this.showButton = true
    else this.showButton = false
  }

}
