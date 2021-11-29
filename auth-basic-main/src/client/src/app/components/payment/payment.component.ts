import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import { emptyCart } from 'src/app/store/actions/cart/cart.actions';
import { cartSelector } from 'src/app/store/selectors/cart/cart.selectors';
import { usersSelector } from 'src/app/store/selectors/user/user.selectors';
import { Cart } from '../../../../../shared/models/cart.model';
import { Food } from '../../../../../shared/models/food.model';
import { User } from '../../../../../shared/models/user.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  cart$ : Observable<Cart | null>
  user$ : Observable<User[]>
  strikeCheckout:any = null;

  constructor(private store: Store<AppState>) {
    this.cart$ = this.store.select(cartSelector)
    this.user$ = this.store.select(usersSelector)
  }
  ngOnInit() {
    this.stripePaymentGateway();
  }

  checkout(amount:number | undefined, cart:Cart) {
    const strikeCheckout = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51IOFc6Lr3AAb1A8aiceu2oP7PmyDHpKYWQGD9F5N7hMtavMGPdYKPQXjsOvQteGO9aOkDsizpQxOmI6dUuw93Irm00tUkv1EZV',
      locale: 'auto',
      token:(stripeToken: any) => {
        console.log(stripeToken)
        // alert('Stripe token generated!');
        alert('Payment was successful');
        this.emptyCart(cart);
      },


    });

    strikeCheckout.open({
      name: 'RemoteStack',
      description: 'Payment widgets',
      amount: amount! * 100
    });

  }

  stripePaymentGateway() {
    if(!window.document.getElementById('stripe-script')) {
      const scr = window.document.createElement("script");
      scr.id = "stripe-script";
      scr.type = "text/javascript";
      scr.src = "https://checkout.stripe.com/checkout.js";

      scr.onload = () => {
        this.strikeCheckout = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51IOFc6Lr3AAb1A8aiceu2oP7PmyDHpKYWQGD9F5N7hMtavMGPdYKPQXjsOvQteGO9aOkDsizpQxOmI6dUuw93Irm00tUkv1EZV',
          locale: 'auto',
          token: function (token: any) {
            console.log(token)
            alert('Payment via stripe successfully!');
          }
        });
      }

      window.document.body.appendChild(scr);
    }
  }



emptyCart(cart:Cart){
  this.store.dispatch(emptyCart({data:cart}))
}
}
