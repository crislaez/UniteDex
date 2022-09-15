import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { trackByFn } from '@uniteDex/shared/utils/functions';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  template:`
  <ion-app>
    <!-- HEADER  -->
    <ion-header class="ion-no-border">    <!-- collapse="condense"  -->
      <ion-toolbar *ngIf="(currentSection$ | async) as currentSection">
        <!-- nav icon  -->
        <ion-menu-button *ngIf="!['pokemon','buildItem','battleItem']?.includes(currentSection?.route)" fill="clear" size="small" slot="start" (click)="open()" class="text-color-light"></ion-menu-button>
        <!-- back button  -->
        <ion-back-button *ngIf="['pokemon','buildItem','battleItem']?.includes(currentSection?.route)" class="text-color-light" slot="start" [defaultHref]="redirectoTo(currentSection)" [text]="''"></ion-back-button>
        <ion-title class="text-color-light big-size" >
          {{ replaceTitle(currentSection?.label) | translate }}
        </ion-title>
        <div size="small" slot="end" class="div-clear"  >
        </div>
      </ion-toolbar>
    </ion-header>


    <!-- MENU LATERAL  -->
    <ion-menu side="start" menuId="first" contentId="main">
      <ion-header  class="ion-no-border menu-header">
        <ion-toolbar >
          <ion-title class="text-color-light" >{{ 'COMMON.MENU' | translate}}</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content >
      <!-- lines="none" -->
        <ng-container *ngFor="let item of links; trackBy: trackByFn" >
          <ion-item detail class="text-color-light" [disabled]="item?.disabled" [routerLink]="['/'+item?.link]" (click)="openEnd()">{{ item?.text | translate }}</ion-item>
        </ng-container>
      </ion-content >
    </ion-menu>


    <!-- RUTER  -->
    <ion-router-outlet id="main"></ion-router-outlet>


    <!-- TAB FOOTER  -->
    <!-- <ion-tabs *ngIf="currentSection$ | async as currentSection">
      <ion-tab-bar [translucent]="true" slot="bottom">
        <ion-tab-button *ngFor="let item of links" [ngClass]="{'active-class': [item?.link]?.includes(currentSection?.route)}" class="text-color-light" [routerLink]="[item?.link]">
          <ion-icon [name]="item?.icon"></ion-icon>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs> -->
  </ion-app>
  `,
  styleUrls: ['app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  trackByFn = trackByFn;
  currentSection$: Observable<{route:string, label:string}> = this.router.events.pipe(
    filter((event: any) => event instanceof NavigationStart),
    map((event: NavigationEnd) => {
      const { url = ''} = event || {}
      const [, route = 'home', params = null ] = url?.split('/') || [];
      // console.log(route)
      const paramsTitle = {
        'pokemon':'COMMON.POKEMON',
        'battleItem':'COMMON.BATTLE_ITEMS',
        'buildItem':'COMMON.BUILD_ITEMS'
      };

      return {
        'home':{route, label:'COMMON.TITLE'},
        'tierList':{route, label:'COMMON.TIER_LIST'},
        'pokemon':{route, label: params},
        'battleItem':{route, label: params},
        'buildItem':{route, label: params},
        'list':{route, label: paramsTitle?.[params] || params},
        'emblem':{route, label:'COMMON.EMBLEMS'},
      }[route] || {route: 'home', label:'COMMON.TITLE'};
    })
    // ,tap(d => console.log(d))
  );

  links = [
    {id:1, link:'home', text:'COMMON.HOME', disabled: false},
    {id:2, link:'list/pokemon', text:'COMMON.POKEMON', disabled: false},
    {id:3, link:'list/buildItem', text:'COMMON.BUILD_ITEMS', disabled: false},
    {id:4, link:'list/battleItem', text:'COMMON.BATTLE_ITEMS', disabled: false},
    {id:5, link:'tierList', text:'COMMON.TIER_LIST', disabled: false},
    {id:6, link:'emblem', text:'COMMON.EMBLEMS', disabled: false}
  ];

  @HostListener('document:ionBackButton', ['$event'])
  private overrideHardwareBackAction($event) {
    $event.detail.register(100, () => console.log('--- DONT CLOSE APP ---'));
  }


  constructor(
    private router: Router,
    private menu: MenuController,
  ) { }


  open() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.close();
  }

  redirectoTo(currentSection:any): string{
    const { route = null} = currentSection || {};
    return {
      'list':'/home',
      'pokemon':'/list/pokemon',
      'battleItem':'/list/battleItem',
      'buildItem':'/list/buildItem'
    }?.[route] || '/home'
  }

  replaceTitle(label:string): string{
    return label?.replace(/%20/g,' ');
  }


}
