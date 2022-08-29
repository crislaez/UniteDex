import { EntityStatus } from '@uniteDex/shared/models';
import { createAction, props } from '@ngrx/store';
import { Pokemon, Filter } from '../models';


export const loadPokemons = createAction(
  '[Pokemon] Load Pokemons',
  props<{ filters?: Filter }>()
);

export const savePokemons = createAction(
  '[Pokemon] Save Pokemons',
  props<{ pokemons: Pokemon[], filters:Filter, error:unknown, status:EntityStatus }>()
);
