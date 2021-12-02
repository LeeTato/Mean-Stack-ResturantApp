import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../..';
import * as fromCart from '../../reducers/cart/cart.reducer';
const cartFeatureSelector = createFeatureSelector<AppState, fromCart.State>(fromCart.cartFeatureKey);

export const cartSelector = createSelector(
  cartFeatureSelector,
  (state) => state.cart
);


