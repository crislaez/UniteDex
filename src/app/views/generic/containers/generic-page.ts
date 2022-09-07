import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Keyboard } from '@capacitor/keyboard';
import { IonContent, ModalController, Platform } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { CoreConfigService } from '@uniteDex/core/services/core-config.service';
import { FilterModalComponent } from '@uniteDex/shared-ui/components/filter-modal/filter-modal.component';
import { BattleItemActions, fromBattleItem } from '@uniteDex/shared/battle-item';
import { BuildItemActions, fromBuildItem } from '@uniteDex/shared/build-item';
import { EntityStatus } from '@uniteDex/shared/models/index';
import { Filter, fromPokemon, Pokemon, PokemonActions } from '@uniteDex/shared/pokemon';
import { gotToTop, trackById } from '@uniteDex/shared/utils/functions';
import { Observable } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'poke-unite-generic-page',
  template:`
  <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">

    <div class="empty-header components-background-primary">
      <!-- FORM  -->
      <div class="search-wrapper displays-center">
        <ng-container  *ngIf="!['pending', 'error'].includes((status$ | async))">
          <form (submit)="searchSubmit($event)">
            <ion-searchbar [placeholder]="'COMMON.BY_NAME' | translate" [formControl]="search" (ionClear)="clearSearch($event)"></ion-searchbar>
          </form>

          <ng-container *ngIf="componentStatus?.option === 'pokemon'">
            <ion-button *ngIf="pokemonFilters$ | async as pokemonFilters" class="class-ion-button" (click)="presentModal(pokemonFilters)"><ion-icon name="options-outline"></ion-icon></ion-button>
          </ng-container>
        </ng-container>
      </div>
    </div>

    <div class="container components-background-dark">

      <ng-container *ngIf="(info$ | async) as info">
        <ng-container *ngIf="(status$ | async) as status">
          <ng-container *ngIf="status !== 'pending' || componentStatus?.slice !== perPage; else loader">
            <ng-container *ngIf="status !== 'error'; else serverError">
              <ng-container *ngIf="info?.list?.length > 0; else noData">

                <div class="header">
                </div>

                <ng-container *ngFor="let pokemon of info?.list; trackBy: trackById">
                  <poke-unite-pokemon-card
                    [type]="componentStatus?.option"
                    [pokemon]="pokemon">
                  </poke-unite-pokemon-card>
                </ng-container>

                <poke-unite-infinite-scroll
                  [status]="status"
                  [slice]="componentStatus?.slice"
                  [total]="info?.total"
                  (loadDataTrigger)="loadData($event)">
                </poke-unite-infinite-scroll>

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
        <div class="header">
        </div>
        <poke-unite-skeleton-card *ngFor="let spinner of [1,2,3,4,5,6,7,8]"></poke-unite-skeleton-card>
      </ng-template>
    </div>

    <!-- TO TOP BUTTON  -->
    <ion-fab *ngIf="showButton" vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button class="color-button-text" (click)="gotToTop(content)"> <ion-icon name="arrow-up-circle-outline"></ion-icon></ion-fab-button>
    </ion-fab>
  </ion-content>
  `,
  styleUrls: ['./generic-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenericPage {

  gotToTop = gotToTop;
  trackById = trackById;
  @ViewChild(IonContent, {static: true}) content: IonContent;
  showButton = false
  search = new FormControl('');
  perPage = Number(this._core.perPage);

  pokemonFilters$ = this.store.select(fromPokemon.selecPokemonFilters);
  status$: Observable<EntityStatus>;
  trigger = new EventEmitter<{slice:number, filters:Filter, option:string, refresh:boolean}>();
  componentStatus:any = {
    slice:this.perPage,
    filters:{},
    option: 'pokemon',
    refresh:false
  };

  info$ = this.trigger.pipe(
    tap(({refresh, option}) => {
      if(refresh) this.dispatchActions(option);
    }),
    switchMap(({slice, filters, option}) =>
      this.getSelectors(option).pipe(
        map(list => {
          const listFilter = Object.values(filters || {})?.length > 0
                        ? this.filterPokemonList(list, filters)
                        : [...list];

          return {
            list: listFilter?.slice(0, slice),
            total: listFilter?.length
          }
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
    public platform: Platform,
    private location: Location,
    private route: ActivatedRoute,
    private _core: CoreConfigService,
    public modalController: ModalController,
  ) { }


  ionViewWillEnter(): void{
    this.componentStatus = {
      ...this.componentStatus,
      option: this.route.snapshot.params?.['typeName'] || 'pokemon'
    }
    this.trigger.next(this.componentStatus)
    this.status$ = this.getStatus(this.componentStatus?.option).pipe(shareReplay(1));
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

  // REFRESH
  doRefresh(event) {
    setTimeout(() => {
      this.search.reset();
      this.componentStatus = {
        ...this.componentStatus,
        slice: this.perPage,
        filters:{},
        refresh:true
      };
      this.trigger.next(this.componentStatus);
      event.target.complete();
    }, 500);
  }

  // INIFINITE SCROLL
  loadData({event, total}) {
    setTimeout(() => {
      this.componentStatus = {
        ...this.componentStatus,
        slice: this.componentStatus.slice + this.perPage,
        refresh:false
      };
      this.trigger.next(this.componentStatus);
      event.target.complete();
    },500)
  }

  // SCROLL EVENT
  logScrolling({detail:{scrollTop}}): void{
    if(scrollTop >= 300) this.showButton = true
    else this.showButton = false
  }

  dispatchActions(option:string = 'pokemon'){
    if(option === 'pokemon'){
      this.store.dispatch(PokemonActions.loadPokemons({}))
      return
    }

    if(option === 'buildItem'){
      this.store.dispatch(BuildItemActions.loadBuildItems({}))
      return
    }

    if(option === 'battleItem'){
      this.store.dispatch(BattleItemActions.loadBattleItems({}))
      return
    }
  }

  // SELECTOR ITEMS
  getSelectors(option:string = 'pokemon'): Observable<any[]>{
    return {
      'pokemon':this.store.select(fromPokemon.selectPokemons),
      'buildItem':this.store.select(fromBuildItem.selectBuildItems),
      'battleItem':this.store.select(fromBattleItem.selectBattleItems)
    }?.[option] || this.store.select(fromPokemon.selectPokemons)
  }

  // ITEM STATUS
  getStatus(option): any{
    return {
      'pokemon':this.store.select(fromPokemon.selectStatus),
      'buildItem':this.store.select(fromBuildItem.selectStatus),
      'battleItem':this.store.select(fromBattleItem.selectStatus)
    }?.[option] || this.store.select(fromPokemon.selectPokemons)
  }

  // OPEN FILTER MODAL
  async presentModal(filters: any) {
    const modal = await this.modalController.create({
      component: FilterModalComponent,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        selectedFilters: this.componentStatus?.filters,
        damageTypes: this.filterParse(filters?.damage_type),
        difficulties: this.filterParse(filters?.difficulty),
        ranges: this.filterParse(filters?.range),
        roles: this.filterParse(filters?.role)
      },
      breakpoints: [0, 0.2, 0.5, 1],
      initialBreakpoint: 0.45, //modal height
    });

    modal.onDidDismiss()
      .then((responseModal) => {
        const { data } = responseModal || {};
        if(!!data || Object.keys(data || {})?.length > 0){
          this.componentStatus = {
            ...(this.componentStatus ?? {}),
            'filters':{
              ...(this.componentStatus?.filters ?? {}),
              ...((data as any) ?? {}),
            },
            refresh:false,
            slice: this.perPage
          };

          this.trigger.next(this.componentStatus);
        }
    });

    return await modal.present();
  }

  // FILTER PARSER
  filterParse(filter: any): string[]{
    return Object.keys(filter || {})?.reduce((acc, el) => {
      return [
        ...(acc ?? []),
        ...(el ? [el] : [])
      ]
    },[]);
  }

  // FILTER ITEMS
  filterPokemonList(pokemon: Pokemon[], filters: Filter & {name?:string}): any{
    // console.log('dentro')
    const { name = null, damageType = null, difficulty = null, range = null, role = null } = filters || {};

    let resultPokemon = [...pokemon];
    resultPokemon = !!name ? (resultPokemon || [])?.filter(({name:pName}) => pName?.toLocaleLowerCase() === name?.toLocaleLowerCase() || pName?.toLocaleLowerCase()?.includes(name?.toLocaleLowerCase())) : [...resultPokemon];
    resultPokemon = !!damageType ? (resultPokemon || [])?.filter(({damage_type}) => damage_type === damageType): [...resultPokemon];
    resultPokemon = !!difficulty ? (resultPokemon || [])?.filter(({tags}) => tags?.difficulty === difficulty) : [...resultPokemon];
    resultPokemon = !!range ? (resultPokemon || [])?.filter(({tags}) => tags?.range === range) : [...resultPokemon];
    resultPokemon = !!role ? (resultPokemon || [])?.filter(({tags}) => tags?.role === role) : [...resultPokemon];

    return resultPokemon || []
  }


}
