import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import { logoutUser } from 'src/app/store/actions/user/user.actions';
import { cartSelector } from 'src/app/store/selectors/cart/cart.selectors';
import { Cart } from '../../../../../shared/models/cart.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  cart$ : Observable<Cart | null>
  constructor(private store: Store<AppState>) {
    this.cart$ = this.store.select(cartSelector)
   }

  ngOnInit(): void {
  }
logout(){
  this.store.dispatch(logoutUser())
}
}

