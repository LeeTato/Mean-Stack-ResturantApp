import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserInputComponent } from './components/user-input/user-input.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import * as fromUser from './store/reducers/user/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/effects/user/user.effects';
import { PageUsersComponent } from './pages/page-users/page-users.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { CreateFoodMenuComponent } from './components/create-food-menu/create-food-menu.component';
import * as fromFood from './store/reducers/food/food.reducer';
import { FoodEffects } from './store/effects/food/food.effects';
import { FoodMenuListComponent } from './components/food-menu-list/food-menu-list.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { CartEffects } from './store/effects/cart/cart.effects';
import * as fromCart from './store/reducers/cart/cart.reducer';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LoginComponent } from './pages/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    UserInputComponent,
    PageUsersComponent,
    PageLoginComponent,
    CreateFoodMenuComponent,
    FoodMenuListComponent,
    NavigationComponent,
    HomeComponent,
    CartComponent,
    LoginComponent,
    PaymentComponent,
    ContactPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CarouselModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreModule.forFeature(fromUser.userFeatureKey, fromUser.reducer),
    EffectsModule.forRoot([UserEffects, FoodEffects, CartEffects]),
    SocketIoModule.forRoot(config),
    StoreModule.forFeature(fromFood.foodFeatureKey, fromFood.reducer),
    StoreModule.forFeature(fromCart.cartFeatureKey, fromCart.reducer),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
