import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { timeStamp } from 'console';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import { deleteCart, loadCart } from 'src/app/store/actions/cart/cart.actions';
import { loadUsers } from 'src/app/store/actions/user/user.actions';
import { cartSelector } from 'src/app/store/selectors/cart/cart.selectors';
import { usersSelector } from 'src/app/store/selectors/user/user.selectors';
import { Cart } from '../../../../../shared/models/cart.model';
import { Food } from '../../../../../shared/models/food.model';
import { User } from '../../../../../shared/models/user.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart$ : Observable<Cart | null>
  user$ : Observable<User[]>
  @Input() public users: User[] = [];
  constructor(private store: Store<AppState>) {
    this.cart$ = this.store.select(cartSelector)
    this.user$ = this.store.select(usersSelector)
   }

  ngOnInit(): void {
    this.store.dispatch(loadCart())
    this.store.dispatch(loadUsers())

  }

deleteFromCart(food: Food){
  this.store.dispatch(deleteCart({data: food}))
}

 }



