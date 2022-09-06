
import { createReducer, on } from '@ngrx/store';
import { EntityStatus } from '@uniteDex/shared/models';
import * as StatActions from '../actions/emblem.actions';
import { Emblem } from '../models';

export const emblemFeatureKey = 'emblem';

export interface State {
  status: EntityStatus;
  emblems?: Emblem[];
  error?: unknown;
}

export const initialState: State = {
  status: EntityStatus.Initial,
  emblems: [],
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(StatActions.loadEmblems, (state): State => ({ ...state, error: undefined, status: EntityStatus.Pending })),
  on(StatActions.saveEmblems, (state, { emblems, status, error }): State => ({...state, emblems, status, error})),

);
