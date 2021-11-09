import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import { updateCart } from 'src/app/store/actions/cart/cart.actions';
import { loadFoods } from 'src/app/store/actions/food/food.actions';
import { foodsSelector } from 'src/app/store/selectors/food/food.selectors';
import { Food } from '../../../../../shared/models/food.model';

@Component({
  selector: 'app-food-menu-list',
  templateUrl: './food-menu-list.component.html',
  styleUrls: ['./food-menu-list.component.scss']
})
export class FoodMenuListComponent implements OnInit {
  foods$:Observable<Food[]>
  constructor(private store:Store<AppState>) {
    this.foods$ = this.store.select(foodsSelector)
  }

  ngOnInit(): void {
  this.store.dispatch(loadFoods())
  }

 addFoodToCart(food:Food){
 this.store.dispatch(updateCart({data:food}))
 }
}

