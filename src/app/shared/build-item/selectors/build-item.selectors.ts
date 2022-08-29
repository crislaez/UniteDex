
import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromBuilItem from '../reducers/build-item.reducer';

export const selectorBuildItemState = createFeatureSelector<fromBuilItem.State>(
  fromBuilItem.buildItemFeatureKey
);

export const selectStatus = createSelector(
  selectorBuildItemState,
  (state) => state?.status
);

export const selectBuildItems = createSelector(
  selectorBuildItemState,
  (state) => state?.buildItems
);

export const selectError = createSelector(
  selectorBuildItemState,
  (state) => state?.error
);

export const selectFilter = createSelector(
  selectorBuildItemState,
  (state) => state?.filters
);

