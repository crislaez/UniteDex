import { createAction, props } from '@ngrx/store';
import { EntityStatus } from '@uniteDex/shared/models';
import { Stat } from '../models';


export const loadStats = createAction(
  '[Stat] Load Stats'
);

export const saveStats = createAction(
  '[Stat] Save Stats',
  props<{ stats: Stat[], error:unknown, status:EntityStatus }>()
);
