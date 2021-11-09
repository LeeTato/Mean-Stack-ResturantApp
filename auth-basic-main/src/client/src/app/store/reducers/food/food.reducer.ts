import { Action, createReducer, on } from '@ngrx/store';
import { Food } from '../../../../../../shared/models/food.model';
import { createFoodSuccess, deleteFoodSuccess, favoriteNumber, loadFoodsSuccess } from '../../actions/food/food.actions';


export const foodFeatureKey = 'food';

export interface State {
     foods:Food[],
     selectedFood: Food | null,
     favoriteNumber: number | null
}

export const initialState: State = {
  foods:[],
  selectedFood:null,
  favoriteNumber:null
};


export const reducer = createReducer<State>(
  initialState,

  on(loadFoodsSuccess, (state, action)=>{
    return{...state, foods:action.data}
  }),
  // Reducer update the state
  on( favoriteNumber, (state, action)=>{
    return{...state, favoriteNumber:action.data*4+2}
  }),

  on(createFoodSuccess, (state, action)=>{
    const foods = [...state.foods]
    foods.push(action.data);
    return {...state, foods}
}),

on(deleteFoodSuccess, (state, action) => {
  return {...state, foods: state.foods.filter(food => food._id !== action.data._id)}
}),

);

