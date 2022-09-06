import { createFeatureSelector, createSelector } from '@ngrx/store';
import { combineFeatureKey, CombineState } from '../reducers';
import { emblemFeatureKey } from '../reducers/emblem.reducer';
import { emblemColorsFeatureKey } from '../reducers/emblemColors.reducer';

export const selectCombineState = createFeatureSelector<CombineState>(combineFeatureKey);

/* === EMBLEM === */
export const selectEmbelmState = createSelector(
  selectCombineState,
  (state) => state[emblemFeatureKey]
);

export const selectEmbelmsStatus = createSelector(
  selectEmbelmState,
  (state) => state?.status
);

export const selectEmbelms = createSelector(
  selectEmbelmState,
  (state) => state?.emblems
);

export const selectEmbelmsList = createSelector(
  selectEmbelmState,
  (state) => state?.emblemList
);

export const selectEmbelmsErrors = createSelector(
  selectEmbelmState,
  (state) => state?.error
);



/* === EMBLEM COLORS === */
export const selectEmbelmColorState = createSelector(
  selectCombineState,
  (state) => state[emblemColorsFeatureKey]
);

export const selectEmbelmsColorsStatus = createSelector(
  selectEmbelmColorState,
  (state) => state?.status
);

export const selectEmbelmsColors = createSelector(
  selectEmbelmColorState,
  (state) => state?.emblemColors
);


export const selectEmbelmsColorsErrors = createSelector(
  selectEmbelmColorState,
  (state) => state?.error
);


