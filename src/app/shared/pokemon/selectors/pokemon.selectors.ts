
import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromPokemon from '../reducers/pokemons.reducer';

export const selectorPokemonState = createFeatureSelector<fromPokemon.State>(
  fromPokemon.pokemonsFeatureKey
);

export const selectStatus = createSelector(
  selectorPokemonState,
  (state) => state?.status
);

export const selectPokemons = createSelector(
  selectorPokemonState,
  (state) => state?.pokemons
);

export const selectErrors = createSelector(
  selectorPokemonState,
  (state) => state?.error
);

export const selecPokemonFilters = createSelector(
  selectorPokemonState,
  (state) => state?.pokemonFilters
);

export const selectFilters = createSelector(
  selectorPokemonState,
  (state) => state?.filters
);

