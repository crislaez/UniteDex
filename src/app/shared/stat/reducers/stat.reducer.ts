
import { createReducer, on } from '@ngrx/store';
import { EntityStatus } from '@uniteDex/shared/models';
import * as StatActions from '../actions/stat.actions';
import { Stat } from '../models';

export const statFeatureKey = 'stat';

export interface State {
  status: EntityStatus;
  stats?: Stat[];
  error?: unknown;
}

export const initialState: State = {
  status: EntityStatus.Initial,
  stats: [],
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(StatActions.loadStats, (state): State => ({ ...state, error: undefined, status: EntityStatus.Pending })),
  on(StatActions.saveStats, (state, { stats, status, error }): State => ({...state, stats, status, error})),

);
