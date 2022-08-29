import { createSelector } from '@ngrx/store';
import { fromBattleItem } from '@uniteDex/shared/battle-item';
import { fromBuildItem } from '@uniteDex/shared/build-item';
import { fromPokemon } from '@uniteDex/shared/pokemon';

export const selectHomeInit = createSelector(
  fromPokemon.selectStatus,
  fromBuildItem.selectStatus,
  fromBattleItem.selectStatus,
  fromPokemon.selectPokemons,
  fromBuildItem.selectBuildItems,
  fromBattleItem.selectBattleItems,
  (pokemonStatus, buildStatus, battleStatus, pokemon, buildItem, battleItem) => {
    return{
      pokemonStatus,
      buildStatus,
      battleStatus,
      pokemon: (pokemon || [])?.slice(0, 7),
      buildItem: (buildItem || [])?.slice(0, 7),
      battleItem: (battleItem || [])?.slice(0, 7),
    }
  }
)
