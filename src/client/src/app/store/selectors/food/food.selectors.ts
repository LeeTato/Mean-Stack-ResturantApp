import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../..';
import * as fromFood from '../../reducers/food/food.reducer';

const foodFeatureSelector = createFeatureSelector<AppState, fromFood.State>(fromFood.foodFeatureKey);

export const foodsSelector = createSelector(
  foodFeatureSelector,
  (state) => state.foods
);

export const selectedFoodSelector = createSelector(
  foodFeatureSelector,
  (state) => state.selectedFood
);

