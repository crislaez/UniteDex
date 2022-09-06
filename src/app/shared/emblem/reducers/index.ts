import { combineReducers } from "@ngrx/store";
import * as fromEmblem from "./emblem.reducer";
import * as fromEmblemColors from "./emblemColors.reducer";

export const combineFeatureKey = 'coin';

export interface CombineState {
  [fromEmblem.emblemFeatureKey]: fromEmblem.State;
  [fromEmblemColors.emblemColorsFeatureKey]: fromEmblemColors.State;
};

export const reducer = combineReducers({
  [fromEmblem.emblemFeatureKey]: fromEmblem.reducer,
  [fromEmblemColors.emblemColorsFeatureKey]: fromEmblemColors.reducer
});
