import { createAction, props } from '@ngrx/store';
import { EntityStatus } from '@uniteDex/shared/models';
import { BuildItem, Filter } from '../models';


export const loadBuildItems = createAction(
  '[Build-item] Load Build Item',
  props<{ filters?: Filter }>()
);

export const saveBuildItems = createAction(
  '[Build-item] Save Build Item',
  props<{ buildItems: BuildItem[], filters:Filter, error:unknown, status:EntityStatus }>()
);
