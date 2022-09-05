import { createSelector } from '@ngrx/store';
import { EntityStatus } from '@uniteDex/shared/models/index';
import { fromPokemon } from '@uniteDex/shared/pokemon';
import { fromStat } from '@uniteDex/shared/stat';


export const selectPokemonInit = (pokemonName) =>  createSelector(
  fromPokemon.selectPokemons,
  fromStat.selectStats,
  fromPokemon.selectStatus,
  fromStat.selectStatus,
  (allPokemon, allStats, pokemonStatus, statStatus) => {
    const pokemon = (allPokemon || [])?.find(({name}) => name === pokemonName) || {};
    const stats = (allStats || [])?.find(({name}) => name === pokemonName)?.level || [];

    return {
      pokemon:{
        ...(pokemon ?? {}),
        ...(stats ? {stats} : {stats:[]})
      },
      status: [ pokemonStatus, statStatus ]?.includes(EntityStatus.Pending)
            ? EntityStatus.Pending
            : EntityStatus.Loaded
    }
  }
)

