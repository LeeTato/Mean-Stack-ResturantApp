import { createAction, props } from '@ngrx/store';
import { Food } from '../../../../../../shared/models/food.model';

export const loadFoods = createAction(
  '[Food] Load Foods'
);

export const loadFoodsSuccess = createAction(
  '[Food] Load Foods Success',
  props<{ data: Food[] }>()
);


export const loadFoodsFailure = createAction(
  '[Food] Load Foods Failure',
  props<{ error: any }>()
);

export const favoriteNumber = createAction(
  '[Food] Load favoriteNumber ',
  props<{ data: number }>()
);

export const createFood = createAction(
  '[Food] create Food',
   props<{data: Food}>()
);

export const createFoodSuccess = createAction(
  '[Food] create Food Success',
  props<{ data: Food }>()
);


export const createFoodFailure = createAction(
  '[Food] create Food Failure',
  props<{ error: any }>()
);

export const deleteFood = createAction(
  '[Food] delete Food',
   props<{ data: Food }>()
);

export const deleteFoodSuccess = createAction(
  '[Food] delete Food Success',
  props<{ data: Food }>()
);


export const deleteFoodFailure = createAction(
  '[Food] delete Food Failure',
  props<{ error: any }>()
);
