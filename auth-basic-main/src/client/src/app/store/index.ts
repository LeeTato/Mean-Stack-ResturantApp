import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromUser from './reducers/user/user.reducer';
import * as fromFood from './reducers/food/food.reducer';
import * as fromCart from './reducers/cart/cart.reducer';


export interface AppState {

  [fromUser.userFeatureKey]: fromUser.State;
  [fromFood.foodFeatureKey]: fromFood.State;
  [fromCart.cartFeatureKey]: fromCart.State;
}

export const reducers: ActionReducerMap<AppState> = {

  [fromUser.userFeatureKey]: fromUser.reducer,
  [fromFood.foodFeatureKey]: fromFood.reducer,
  [fromCart.cartFeatureKey]: fromCart.reducer,
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
