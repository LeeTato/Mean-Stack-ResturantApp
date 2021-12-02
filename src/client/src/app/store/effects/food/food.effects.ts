import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { FoodService } from 'src/app/services/food.service';
import {  createFood, createFoodFailure, createFoodSuccess, deleteFood, deleteFoodFailure, deleteFoodSuccess, loadFoods, loadFoodsFailure, loadFoodsSuccess } from '../../actions/food/food.actions';



@Injectable()
export class FoodEffects {
  createFoods$ = createEffect(() =>
  this.actions$.pipe(
    ofType(createFood),
    mergeMap((action) =>
      this.foodService.createFoodMenu(action.data).pipe(
        map((data) => createFoodSuccess({ data })),
        catchError((error) => of(createFoodFailure({ error })))
      )
    )
  )
);

loadFoods$ = createEffect(() =>
this.actions$.pipe(
  ofType(loadFoods),
  mergeMap(() =>
    this.foodService.getFoods().pipe(
      map((data) => loadFoodsSuccess({ data })),
      catchError((error) => of(loadFoodsFailure({ error })))
    )
  )
)
);
deleteFood$ = createEffect(() =>
this.actions$.pipe(
  ofType(deleteFood),
  mergeMap((action) =>
    this.foodService.deleteFoodFromMenu(action.data).pipe(
      map((data) => deleteFoodSuccess({ data })),
      catchError((error) => of(deleteFoodFailure({ error })))
    )
  )
)
);

  constructor(private actions$: Actions, private foodService: FoodService) {}

}
