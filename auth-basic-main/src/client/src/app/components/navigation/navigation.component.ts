import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import { logoutUser } from 'src/app/store/actions/user/user.actions';
import { cartSelector } from 'src/app/store/selectors/cart/cart.selectors';
import { usersSelector } from 'src/app/store/selectors/user/user.selectors';
import { Cart } from '../../../../../shared/models/cart.model';
import { User } from '../../../../../shared/models/user.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent implements OnInit {
  cart$ : Observable<Cart | null>
  user$ : Observable<User[]>
  constructor(private store: Store<AppState>) {
    this.cart$ = this.store.select(cartSelector)
    this.user$ = this.store.select(usersSelector)
   }

  ngOnInit(): void {
  }
logout(){
  this.store.dispatch(logoutUser())
}
}

