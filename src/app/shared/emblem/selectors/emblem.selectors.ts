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

export const selectStorageStatus = createSelector(
  selectEmbelmState,
  (state) => state?.status
);

export const selectEmbelms = createSelector(
  selectEmbelmState,
  (state) => state.emblems
);


export const selectStorageErrors = createSelector(
  selectEmbelmState,
  (state) => state.error
);



/* === EMBLEM COLORS === */
export const selectEmbelmColorState = createSelector(
  selectCombineState,
  (state) => state[emblemColorsFeatureKey]
);

export const selectRechargeStatus = createSelector(
  selectEmbelmColorState,
  (state) => state?.status
);

export const selectEmbelmsColors = createSelector(
  selectEmbelmColorState,
  (state) => state.emblemColors
);


export const selectRechargeErrors = createSelector(
  selectEmbelmColorState,
  (state) => state.error
);


