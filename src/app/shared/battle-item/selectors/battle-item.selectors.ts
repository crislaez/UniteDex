
import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromBattleItem from '../reducers/battle-item.reducer';

export const selectorBattleItemState = createFeatureSelector<fromBattleItem.State>(
  fromBattleItem.battleItemFeatureKey
);

export const selectStatus = createSelector(
  selectorBattleItemState,
  (state) => state?.status
);

export const selectBattleItems = createSelector(
  selectorBattleItemState,
  (state) => state?.battleItems
);

export const selectError = createSelector(
  selectorBattleItemState,
  (state) => state?.error
);

export const selectFilter = createSelector(
  selectorBattleItemState,
  (state) => state?.filters
);

