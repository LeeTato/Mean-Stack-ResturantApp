import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import { loadCart } from 'src/app/store/actions/cart/cart.actions';
import { cartSelector } from 'src/app/store/selectors/cart/cart.selectors';
import { Cart } from '../../../../../shared/models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart$ : Observable<Cart | null>
  constructor(private store: Store<AppState>) {
    this.cart$ = this.store.select(cartSelector)
   }

  ngOnInit(): void {
    this.store.dispatch(loadCart())

  }

}

