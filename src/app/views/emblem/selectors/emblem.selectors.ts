import { createSelector } from '@ngrx/store';
import { fromCoin } from '@uniteDex/shared/emblem';
import { EntityStatus } from '@uniteDex/shared/models';

export const selectEmblemInit = createSelector(
  fromCoin.selectEmbelms,
  fromCoin.selectEmbelmsList,
  fromCoin.selectEmbelmsColors,
  fromCoin.selectEmbelmsStatus,
  fromCoin.selectEmbelmsColorsStatus,
  (emblems, emblemList, emblemsColors, emblemsStatus, emblemsColorsStatus) => {

    return {
      ...(emblems ? {emblems} : {emblems:[]}),
      ...(emblemList ? {emblemList} : {emblemList:[]}),
      ...(emblemsColors ? {emblemsColors} : {emblemsColors:[]}),
      status: [emblemsStatus, emblemsColorsStatus]?.includes(EntityStatus.Pending)
            ? EntityStatus.Pending
            : EntityStatus.Loaded
    };
  }
)
