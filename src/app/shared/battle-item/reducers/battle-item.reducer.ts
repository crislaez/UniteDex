
import { createReducer, on } from '@ngrx/store';
import { EntityStatus } from '@uniteDex/shared/models';
import * as BattleItemActions from '../actions/battle-item.actions';
import { BattleItem, Filter } from '../models';

export const battleItemFeatureKey = 'battleItem';

export interface State {
  status: EntityStatus;
  battleItems?: BattleItem[];
  filters?: Filter;
  error?: unknown;
}

export const initialState: State = {
  status: EntityStatus.Initial,
  battleItems: [],
  filters: null,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(BattleItemActions.loadBattleItems, (state): State => ({ ...state, error: undefined, status: EntityStatus.Pending })),
  on(BattleItemActions.saveBattleItems, (state, { battleItems, filters, status, error }): State => ({...state, battleItems, status, error, filters})),

);
