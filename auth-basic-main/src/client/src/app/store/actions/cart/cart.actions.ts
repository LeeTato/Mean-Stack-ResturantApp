import { createAction, props } from '@ngrx/store';
import { Cart } from '../../../../../../shared/models/cart.model';
import { Food } from '../../../../../../shared/models/food.model';

export const loadCart = createAction(
  '[Cart] Load Cart'
);

export const loadCartSuccess = createAction(
  '[Cart] Load Cart Success',
  props<{ data: Cart }>()
);

export const loadCartFailure = createAction(
  '[Cart] Load Cart Failure',
  props<{ error: Error }>()
);
export const updateCart = createAction(
  '[Cart] update Cart',
  props<{ data: Food }>()
);

export const updateCartSuccess = createAction(
  '[Cart] Update Cart Success',
  props<{ data: Cart }>()
);

export const updateCartFailure = createAction(
  '[Cart] Update Cart Failure',
  props<{ error: Error }>()
);
export const deleteCart = createAction(
  '[Cart] delete Cart',
  props<{ data: Food }>()
);

export const deleteCartSuccess = createAction(
  '[Cart] delete Cart Success',
  props<{ data: Cart }>()
);

export const deleteCartFailure = createAction(
  '[Cart] delete Cart Failure',
  props<{ error: Error }>()
);

export const removeFromCart = createAction(
  '[Cart] RemoveFromCart',
  props<{ data: Food }>()
);

export const removeFromCartSuccess = createAction(
  '[Cart] RemoveFromCart Success',
  props<{ data: Cart }>()
);

export const removeFromCartFailure = createAction(
  '[Cart] RemoveFromCart Failure',
  props<{ error: Error }>()
);
