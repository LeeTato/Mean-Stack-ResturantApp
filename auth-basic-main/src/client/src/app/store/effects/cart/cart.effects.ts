import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { CartService } from 'src/app/services/cart.service';
import { loadCart, loadCartSuccess, loadCartFailure, updateCartFailure, updateCartSuccess,updateCart, deleteCart, deleteCartSuccess, deleteCartFailure } from '../../actions/cart/cart.actions';



@Injectable()
export class CartEffects {
  loadCart$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loadCart),
    mergeMap(() =>
      this.cartService. getCart().pipe(
        map((data) => loadCartSuccess({ data })),
        catchError((error) => of(loadCartFailure({ error })))
      )
    )
  )
);

updateCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCart),
      mergeMap((action) =>
        this.cartService.cartUpdate(action.data).pipe(
          map((data) => updateCartSuccess({ data })),
          catchError((error) => of(updateCartFailure({ error })))
        )
      )
    )
  );

deleteCart$ = createEffect(() =>
this.actions$.pipe(
  ofType(deleteCart),
  mergeMap((action) =>
    this.cartService.deleteFromCart(action.data).pipe(
      map((data) => deleteCartSuccess( data )),
      catchError((error) => of(deleteCartFailure({ error })))
    )
  )
)
);

  constructor(private actions$: Actions, private cartService: CartService) {}

}
