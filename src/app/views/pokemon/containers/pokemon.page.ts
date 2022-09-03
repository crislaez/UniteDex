import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { CoreConfigService } from '@uniteDex/core/services/core-config.service';
import { fromPokemon, PokemonActions } from '@uniteDex/shared/pokemon';
import { emptyObject, errorImage, getObjectKeys, gotToTop, trackById } from '@uniteDex/shared/utils/functions';
import { map, switchMap } from 'rxjs/operators';


@Component({
  selector: 'poke-unite-pokemon',
  template:`
  <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">

    <div class="empty-header components-background-primary">
    </div>

    <div class="container components-background-dark">
      <ng-container *ngIf="(pokemon$ | async) as pokemon">
        <ng-container *ngIf="(status$ | async) as status">
          <ng-container *ngIf="status !== 'pending'; else loader">
            <ng-container *ngIf="status !== 'error'; else serverError">
              <ng-container *ngIf="emptyObject(pokemon); else noData">

                <div class="width-max displays-center">
                  <ion-avatar class="pokemon-principal-image" slot="start">
                    <ion-img loading="lazy" [src]="_core.imageUrl('pokemon',pokemon?.['name'])" loading="lazy" (ionError)="errorImage($event)"></ion-img>
                  </ion-avatar>
                </div>

                <div class="width-max displays-around-center margin-top-20">
                  <ion-chip *ngFor="let item of getObjectKeys(pokemon?.['tags']); trackBy: trackById">{{ pokemon?.['tags']?.[item] }}</ion-chip>
                </div>

                <div class="displays-center margin-top-10">
                  <ion-chip *ngIf="pokemon?.['damage_type'] as damage_type" class="attack">{{ damage_type }} {{ 'COMMON.ATTACKER' | translate }}</ion-chip>
                </div>

                <ion-segment scrollable (ionChange)="segmentChanged($any($event))" [(ngModel)]="selected">
                  <ion-segment-button *ngFor="let item of itemsSegments; let i = index;" [value]="item?.id" class="text-color-light">
                    <ion-label class="capital-letter">{{ item?.label | translate }}</ion-label>
                  </ion-segment-button>
                </ion-segment>

                <poke-unite-abilities
                  *ngIf="selected === 1"
                  [pokemon]="pokemon">
                </poke-unite-abilities>

                <poke-unite-info
                  *ngIf="selected === 2"
                  [pokemon]="pokemon">
                </poke-unite-info>

                <poke-unite-builds
                  *ngIf="selected === 3"
                  [pokemon]="pokemon">
                </poke-unite-builds>

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
  styleUrls: ['./pokemon.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonPage {

  gotToTop = gotToTop;
  trackById = trackById;
  errorImage = errorImage;
  emptyObject = emptyObject;
  getObjectKeys = getObjectKeys;
  showButton = false
  @ViewChild(IonContent, {static: true}) content: IonContent;

  status$ = this.store.select(fromPokemon.selectStatus);
  pokemon$ = this.route.params.pipe(
    switchMap(({pokemonName}) =>
      this.store.select(fromPokemon.selectPokemons).pipe(
        map(allPokemons => {
          return (allPokemons || [])?.find(({name}) => name === pokemonName) || {};
        })
      )
    )
    // ,tap(d => console.log(d))
  );

  selected = 1;
  itemsSegments = [
    {id:1, label:'COMMON.ABILITIES'},
    {id:2, label:'COMMON.INFO'},
    {id:3, label:'COMMON.BUILDS'},
  ];


  constructor(
    private store: Store,
    private route: ActivatedRoute,
    public _core: CoreConfigService
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

  segmentChanged({detail:{value}}): void{
    this.selected = Number(value);
  }


}
