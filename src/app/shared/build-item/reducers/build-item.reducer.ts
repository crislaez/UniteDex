
import { createReducer, on } from '@ngrx/store';
import { EntityStatus } from '@uniteDex/shared/models';
import * as BuildItemActions from '../actions/build-item.actions';
import { BuildItem, Filter } from '../models';

export const buildItemFeatureKey = 'buildItem';

export interface State {
  status: EntityStatus;
  buildItems?: BuildItem[];
  filters?: Filter;
  error?: unknown;
}

export const initialState: State = {
  status: EntityStatus.Initial,
  buildItems: [],
  filters: null,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(BuildItemActions.loadBuildItems, (state): State => ({ ...state, error: undefined, status: EntityStatus.Pending })),
  on(BuildItemActions.saveBuildItems, (state, { buildItems, filters, status, error }): State => ({...state, buildItems, status, error, filters})),

);
