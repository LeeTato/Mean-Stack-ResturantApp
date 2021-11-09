import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Food } from '../../../../shared/models/food.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor( private api:ApiService) { }

  getFoods() {
    return this.api.get<{ data: Food[] }>('foods').pipe(map((res)=> res.data));
  }
  createFoodMenu(food:Food) {
    return this.api.post<{ data: Food }>('create-food/', food).pipe(map((res) => res.data));

  }
  deleteFoodFromMenu(food: Food) {
    return this.api
      .delete<{ data: Food }>('delete-food/' + food._id)
      .pipe(map((res) => res.data));
  }
}
