import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { CartService } from 'src/app/services/cart.service';
import { loadCart, loadCartSuccess, loadCartFailure, updateCartFailure, updateCartSuccess,updateCart, deleteCart, deleteCartSuccess, deleteCartFailure, removeFromCart, removeFromCartSuccess, removeFromCartFailure, emptyCart, emptyCartSuccess, emptyCartFailure, payment } from '../../actions/cart/cart.actions';



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

  removeFromCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeFromCart),
      mergeMap((action) =>
        this.cartService.removeFromCart(action.data).pipe(
          map((data) => removeFromCartSuccess({ data })),
          catchError((error) => of(removeFromCartFailure({ error })))
        )
      )
    )
  );


deleteCart$ = createEffect(() =>
this.actions$.pipe(
  ofType(deleteCart),
  mergeMap((action) =>
    this.cartService.deleteFromCart(action.data).pipe(
      map((data) => deleteCartSuccess({ data} )),
      catchError((error) => of(deleteCartFailure({ error })))
    )
  )
)
);

emptyCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(emptyCart),
      mergeMap((action) =>
        this.cartService.emptyCart(action.data).pipe(
          map((data) => emptyCartSuccess({ data })),
          catchError((error) => of(emptyCartFailure({ error })))
        )
      )
    )
  );

// payment$ = createEffect(() =>
// this.actions$.pipe(
//   ofType(payment),
//   mergeMap((action) =>
//     this.cartService.payment(action.data,data).pipe(
//       map((data) => deleteCartSuccess({ data} )),
//       catchError((error) => of(deleteCartFailure({ error })))
//     )
//   )
// )
// );

  constructor(private actions$: Actions, private cartService: CartService) {}

}
