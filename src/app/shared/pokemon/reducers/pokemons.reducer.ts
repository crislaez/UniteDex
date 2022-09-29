
import { createReducer, on } from '@ngrx/store';
import { EntityStatus } from '@uniteDex/shared/models';
import * as PokemonActions from '../actions/pokemon.actions';
import { PokemonFilter, Pokemon } from '../models';

export const pokemonsFeatureKey = 'pokemon';

export interface State {
  status: EntityStatus;
  pokemons?: Pokemon[];
  filters?: PokemonFilter;
  pokemonFilters?:{[key:string]:string};
  error?: unknown;
}

export const initialState: State = {
  status: EntityStatus.Initial,
  pokemons: [],
  filters: null,
  pokemonFilters: null,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(PokemonActions.loadPokemons, (state): State => ({ ...state, error: undefined, status: EntityStatus.Pending })),
  on(PokemonActions.savePokemons, (state, { pokemons, filters, status, error }): State => {
    const pokemonFilters: any = {
      ...(pokemons || [])?.reduce((acc, el ) => {
        const { damage_type = null, tags = null } = el || {};
        return {
          ...(acc ?? {}),
          'damage_type':{
            ...(acc['damage_type'] ?? {}),
            ...(damage_type ? { [damage_type]:damage_type } : {})
          },
          ...Object.keys(tags || {})?.reduce((accumulate, key) => {
            return {
              ...(accumulate ?? {}),
              [key]:{
                ...(acc[key] ?? {}),
                ...(key ? { [tags?.[key]]:tags?.[key] } : {})
              }
            }
          },{})
        }
      },{})
    };

    return {
      ...state,
      pokemons,
      status,
      error,
      filters,
      pokemonFilters
    }
  })
);
