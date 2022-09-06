
import { createReducer, on } from '@ngrx/store';
import { EntityStatus } from '@uniteDex/shared/models';
import * as StatActions from '../actions/emblem.actions';
import { Emblem } from '../models';

export const emblemFeatureKey = 'emblem';

export interface State {
  status: EntityStatus;
  emblems?: Emblem[];
  emblemList?: Emblem[];
  error?: unknown;
}

export const initialState: State = {
  status: EntityStatus.Initial,
  emblems: [],
  emblemList: [],
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(StatActions.loadEmblems, (state): State => ({ ...state, error: undefined, status: EntityStatus.Pending })),
  on(StatActions.saveEmblems, (state, { emblems, status, error }): State => {
    return {
      ...state,
      emblems,
      emblemList: (emblems || [])?.filter(({name}) => name?.slice(-1) === 'C'),
      status,
      error
    }
  }),

);
