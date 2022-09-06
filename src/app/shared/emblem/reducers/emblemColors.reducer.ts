
import { createReducer, on } from '@ngrx/store';
import { EntityStatus } from '@uniteDex/shared/models';
import * as StatActions from '../actions/emblem.actions';
import { EmblemColor } from '../models';

export const emblemColorsFeatureKey = 'emblemColors';

export interface State {
  status: EntityStatus;
  emblemColors?: EmblemColor[];
  error?: unknown;
}

export const initialState: State = {
  status: EntityStatus.Initial,
  emblemColors: [],
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(StatActions.loadEmblemsColors, (state): State => ({ ...state, error: undefined, status: EntityStatus.Pending })),
  on(StatActions.saveEmblemsColors, (state, { emblemColors, status, error }): State => ({...state, emblemColors, status, error})),

);
