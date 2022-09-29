import { createSelector } from '@ngrx/store';
import { fromCoin } from '@uniteDex/shared/emblem';
import { EntityStatus } from '@uniteDex/shared/models';

export const selectEmblemInit = createSelector(
  fromCoin.selectEmblems,
  fromCoin.selectEmblemsList,
  fromCoin.selectEmblemsColors,
  fromCoin.selectEmblemsStatus,
  fromCoin.selectEmblemsColorsStatus,
  (emblems, emblemList, emblemsColors, emblemsStatus, emblemsColorsStatus) => {

    return {
      emblems: emblems ?? [],
      emblemList: emblemList ?? [],
      emblemsColors: emblemsColors ?? [],
      // ...(emblems ? {emblems} : {emblems:[]}),
      // ...(emblemList ? {emblemList} : {emblemList:[]}),
      // ...(emblemsColors ? {emblemsColors} : {emblemsColors:[]}),
      status: [emblemsStatus, emblemsColorsStatus]?.includes(EntityStatus.Pending)
            ? EntityStatus.Pending
            : [emblemsStatus, emblemsColorsStatus]?.includes(EntityStatus.Error)
            ? EntityStatus.Error
            : EntityStatus.Loaded
    };
  }
)
