import { createAction, props } from '@ngrx/store';
import { EntityStatus } from '@uniteDex/shared/models';
import { Emblem, EmblemColor } from '../models';


export const initLoadEmblem = createAction(
  '[Emblem] Init Load Emblem'
);

export const loadEmblems = createAction(
  '[Emblem] Load Emblems'
);

export const saveEmblems = createAction(
  '[Emblem] Save Emblems',
  props<{ emblems: Emblem[], error:unknown, status:EntityStatus }>()
);


export const loadEmblemsColors = createAction(
  '[Emblem] Load Emblems Colors'
);

export const saveEmblemsColors = createAction(
  '[Emblem] Save Emblems Colors',
  props<{ emblemColors: EmblemColor[], error:unknown, status:EntityStatus }>()
);
