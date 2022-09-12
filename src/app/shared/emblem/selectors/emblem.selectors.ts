import { createFeatureSelector, createSelector } from '@ngrx/store';
import { combineFeatureKey, CombineState } from '../reducers';
import { emblemFeatureKey } from '../reducers/emblem.reducer';
import { emblemColorsFeatureKey } from '../reducers/emblemColors.reducer';

export const selectCombineState = createFeatureSelector<CombineState>(combineFeatureKey);

/* === EMBLEM === */
export const selectEmblemState = createSelector(
  selectCombineState,
  (state) => state[emblemFeatureKey]
);

export const selectEmblemsStatus = createSelector(
  selectEmblemState,
  (state) => state?.status
);

export const selectEmblems = createSelector(
  selectEmblemState,
  (state) => state?.emblems
);

export const selectEmblemsList = createSelector(
  selectEmblemState,
  (state) => state?.emblemList
);

export const selectEmblemsErrors = createSelector(
  selectEmblemState,
  (state) => state?.error
);



/* === EMBLEM COLORS === */
export const selectEmblemColorState = createSelector(
  selectCombineState,
  (state) => state[emblemColorsFeatureKey]
);

export const selectEmblemsColorsStatus = createSelector(
  selectEmblemColorState,
  (state) => state?.status
);

export const selectEmblemsColors = createSelector(
  selectEmblemColorState,
  (state) => state?.emblemColors
);


export const selectEmblemsColorsErrors = createSelector(
  selectEmblemColorState,
  (state) => state?.error
);


