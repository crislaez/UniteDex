import { EntityStatus } from '@uniteDex/shared/models';
import { createAction, props } from '@ngrx/store';
import { Pokemon, PokemonFilter } from '../models';


export const loadPokemons = createAction(
  '[Pokemon] Load Pokemons',
  props<{ filters?: PokemonFilter }>()
);

export const savePokemons = createAction(
  '[Pokemon] Save Pokemons',
  props<{ pokemons: Pokemon[], filters:PokemonFilter, error:unknown, status:EntityStatus }>()
);
