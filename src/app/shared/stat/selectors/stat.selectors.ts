
import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromStat from '../reducers/stat.reducer';

export const selectorStatState = createFeatureSelector<fromStat.State>(
  fromStat.statFeatureKey
);

export const selectStatus = createSelector(
  selectorStatState,
  (state) => state?.status
);

export const selectStats = createSelector(
  selectorStatState,
  (state) => state?.stats
);

export const selectError = createSelector(
  selectorStatState,
  (state) => state?.error
);
