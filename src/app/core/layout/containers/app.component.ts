import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { trackById } from '@uniteDex/shared/utils/functions';
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
        <ion-menu-button *ngIf="['home']?.includes(currentSection?.route)" fill="clear" size="small" slot="start" (click)="open()" class="text-color-light"></ion-menu-button>

        <!-- back button  -->
        <ion-back-button *ngIf="!['home']?.includes(currentSection?.route)" class="text-color-light" slot="start" [defaultHref]="redirectoTo(currentSection)" [text]="''"></ion-back-button>

        <ion-title class="text-color-light big-size">
          {{ currentSection?.label | translate }}
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
        <ion-item lines="none" class="text-color-light" *ngFor="let item of links; trackBy: trackById" [routerLink]="['/'+item?.link]" (click)="openEnd()">{{ item?.text | translate }}</ion-item>
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

  trackById = trackById;
  currentSection$: Observable<{route:string, label:string}> = this.router.events.pipe(
    filter((event: any) => event instanceof NavigationStart),
    map((event: NavigationEnd) => {
      const { url = ''} = event || {}
      const [, route = 'home', params = null ] = url?.split('/') || [];

      const paramsTitle = {
        'pokemon':'COMMON.POKEMON',
        'battleItem':'COMMON.BATTLE_ITEMS',
        'buildItem':'COMMON.BUILD_ITEMS'
      };

      return {
        'home':{route, label:'COMMON.TITLE'},
        'pokemon':{route, label: params},
        'list':{route, label: paramsTitle?.[params] || params}
      }[route] || {route: 'home', label:'COMMON.TITLE'};
    })
    // ,tap(d => console.log(d))
  );

  links = [
    {id:1, link:'home', text:'COMMON.HOME'},
    {id:2, link:'list/pokemon', text:'COMMON.POKEMON'},
    {id:3, link:'list/buildItem', text:'COMMON.BUILD_ITEMS'},
    {id:4, link:'list/battleItem', text:'COMMON.BATTLE_ITEMS'},
    {id:5, link:'list/tierList', text:'COMMON.TIER_LIST'}
  ];


  constructor(
    private menu: MenuController,
    private router: Router
  ) { }


  open() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.close();
  }

  redirectoTo(currentSection:any): string{
    // console.log(currentSection)
    const { route = null} = currentSection || {};
    return {
      'list':'/home',
      'pokemon':'/list/pokemon'
    }?.[route] || '/home'
  }

}