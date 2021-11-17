import { Action, createReducer, on } from '@ngrx/store';
import { Cart } from '../../../../../../shared/models/cart.model';
import { deleteCartSuccess, loadCartSuccess, updateCartSuccess } from '../../actions/cart/cart.actions';
import { logoutUserSuccess } from '../../actions/user/user.actions';


export const cartFeatureKey = 'cart';

export interface State {
cart: Cart | null

}

export const initialState: State = {
cart:null,

};


export const reducer = createReducer(
  initialState,
  on(loadCartSuccess, (state, action) => {
    return { ...state, cart: action.data }
  }),

  on(updateCartSuccess, (state, action) => {
    return { ...state, cart: action.data }
  }),

 on(deleteCartSuccess, (state, action) => {
    return {...state, cart: action.data};
  }),
  on(logoutUserSuccess, (state, action) => {
    return { ...state, cart:null}
  }),

);

