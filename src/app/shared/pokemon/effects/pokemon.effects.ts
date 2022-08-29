import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { NotificationActions } from '@uniteDex/shared/notification';
import { EntityStatus } from '@uniteDex/shared/models';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as PokemonActions from '../actions/pokemon.actions';
import { PokemonService } from '../services/pokemon.service';


@Injectable()
export class PokemonEffects implements OnInitEffects {

  loadPokemons$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PokemonActions.loadPokemons),
      switchMap(({filters}) => {
        return this._pokemon.getPokemons().pipe(
          map(({pokemons}) => PokemonActions.savePokemons({ pokemons, filters, error:undefined, status:EntityStatus.Loaded })),
          catchError(error => {
            return of(
              PokemonActions.savePokemons({ pokemons:[], filters, error, status:EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_POKEMONS'})
            )
          })
        )
      })
    )
  });


  ngrxOnInitEffects() {
    return PokemonActions.loadPokemons({})
  };


  constructor(
    private actions$: Actions,
    private _pokemon: PokemonService,
    public toastController: ToastController,
  ) { }


}
