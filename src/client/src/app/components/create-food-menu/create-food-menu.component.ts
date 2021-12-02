import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import { createFood,  deleteFood,  favoriteNumber, loadFoods } from 'src/app/store/actions/food/food.actions';
import { foodsSelector } from 'src/app/store/selectors/food/food.selectors';
import { Food } from '../../../../../shared/models/food.model';
@Component({
  selector: 'app-create-food-menu',
  templateUrl: './create-food-menu.component.html',
  styleUrls: ['./create-food-menu.component.scss']
})
export class CreateFoodMenuComponent implements OnInit {
   adminView$: Observable<Food[]>
  createMenu: FormGroup;
  constructor( private fb: FormBuilder,private store:Store<AppState>) {
    this. adminView$ = this.store.select(foodsSelector)

    
    this.createMenu = this.fb.group({
      foodName:['',Validators.required],
      img:['',Validators.compose([Validators.required])],
      foodPrice:['',Validators.compose([Validators.required])],

   });
     this.store.dispatch(loadFoods());
     this.store.dispatch(favoriteNumber({data:2}))
  }
   ngOnInit(): void {}

  addFood(){
    this.store.dispatch(createFood({ data:this.createMenu.value}))
    this.createMenu.reset();
 }

 deleteFood(food: Food) {
  this.store.dispatch( deleteFood({data: food}))
  console.log(`food '${food.foodName}' deleted successfully`);
}

}


