import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { CoreConfigService } from '@uniteDex/core/services/core-config.service';
import { BuildItemActions, fromBuildItem } from '@uniteDex/shared/build-item';
import { emptyObject, errorImage, getObjectKeys, gotToTop, trackById } from '@uniteDex/shared/utils/functions';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'poke-unite-build-item',
  template:`
  <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">

    <div class="empty-header components-background-primary">
    </div>

    <div class="container components-background-dark">
      <ng-container *ngIf="(buildItem$ | async) as buildItem">
        <ng-container *ngIf="(status$ | async) as status">
          <ng-container *ngIf="status !== 'pending'; else loader">
            <ng-container *ngIf="status !== 'error'; else serverError">
              <ng-container *ngIf="emptyObject(buildItem); else noData">

                <div class="width-max displays-center">
                  <ion-avatar class="build-principal" slot="start">
                    <ion-img loading="lazy" [src]="_core.imageUrl('buildItem',buildItem?.['name'])" loading="lazy" (ionError)="errorImage($event)"></ion-img>
                  </ion-avatar>
                </div>

                <div class="displays-center margin-top-10">
                  <ion-chip *ngIf="buildItem?.['damage_type'] as damage_type" class="attack">{{ damage_type }} {{ 'COMMON.ATTACKER' | translate }}</ion-chip>
                </div>

                <poke-unite-build-item-info
                  [buildItem]="buildItem"
                  [level]="level"
                  (change)="changeLevel($event)">
                </poke-unite-build-item-info>

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
  styleUrls: ['./build-item.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuildItemPage {

  gotToTop = gotToTop;
  trackById = trackById;
  errorImage = errorImage;
  emptyObject = emptyObject;
  getObjectKeys = getObjectKeys;
  showButton = false
  @ViewChild(IonContent, {static: true}) content: IonContent;
  level = 1;
  status$ = this.store.select(fromBuildItem.selectStatus);
  buildItem$ = this.route.params.pipe(
    switchMap(({buildItemName}) =>
      this.store.select(fromBuildItem.selectBuildItems).pipe(
        map((allBuildItems) => {
          return (allBuildItems || [])?.find(({name}) => name === buildItemName) || {}
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
      this.level = 1;
      this.store.dispatch(BuildItemActions.loadBuildItems({}));
      event.target.complete();
    }, 500);
  }

  // SCROLL EVENT
  logScrolling({detail:{scrollTop}}): void{
    if(scrollTop >= 300) this.showButton = true
    else this.showButton = false
  }

  changeLevel(level: number): void{
    this.level = level;
  }


}
