import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CreateFoodMenuComponent } from './components/create-food-menu/create-food-menu.component';
import { FoodMenuListComponent } from './components/food-menu-list/food-menu-list.component';
import { HomeComponent } from './components/home/home.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageUsersComponent } from './pages/page-users/page-users.component';

const routes: Routes = [
  {path: 'login', component: PageLoginComponent},
  {path: 'createMenu', component: CreateFoodMenuComponent},
  {path: 'menuList', component: FoodMenuListComponent},
  {path: 'payment', component: PaymentComponent},
  {path: 'cart', component: CartComponent},
  {path: 'userLogin', component: LoginComponent},
  {path: 'users', component: PageUsersComponent, canActivate: [AuthGuard], resolve: []},
  {path: 'home', component: HomeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
