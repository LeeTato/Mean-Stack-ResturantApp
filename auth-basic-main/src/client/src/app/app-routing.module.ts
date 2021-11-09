import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CreateFoodMenuComponent } from './components/create-food-menu/create-food-menu.component';
import { FoodMenuListComponent } from './components/food-menu-list/food-menu-list.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageUsersComponent } from './pages/page-users/page-users.component';

const routes: Routes = [
  {path: 'login', component: PageLoginComponent},
  {path: 'createMenu', component: CreateFoodMenuComponent},
  {path: 'menuList', component: FoodMenuListComponent},
  {path: 'cart', component: CartComponent},
  {path: 'users', component: PageUsersComponent, canActivate: [AuthGuard], resolve: []},
  {path: 'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
