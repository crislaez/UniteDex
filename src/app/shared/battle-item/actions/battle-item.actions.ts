import { createAction, props } from '@ngrx/store';
import { EntityStatus } from '@uniteDex/shared/models';
import { BattleItem, Filter } from '../models';


export const loadBattleItems = createAction(
  '[Battle-item] Load Battle Item',
  props<{ filters?: Filter }>()
);

export const saveBattleItems = createAction(
  '[Battle-item] Save Battle Item',
  props<{ battleItems: BattleItem[], filters:Filter, error:unknown, status:EntityStatus }>()
);
