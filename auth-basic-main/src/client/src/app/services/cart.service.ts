import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Cart } from '../../../../shared/models/cart.model';
import { Food } from '../../../../shared/models/food.model';
import { User } from '../../../../shared/models/user.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {



  constructor(private api:ApiService) { }

  cartUpdate(food: Food) {
    console.log("Update Cart In The Service",food)
   return this.api.put<Cart>('update-cart', food);
  }
  getCart(){
    return this.api.get<{ data: Cart }>('cart')
    .pipe(map((res) => res.data));

  }
  deleteFromCart(food: Food) {
    return this.api. put<{ data: Cart }>('delete-cart/' + food._id, food)

  }
}
