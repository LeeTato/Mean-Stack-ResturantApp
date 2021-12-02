import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { AppState } from 'src/app/store';
import { emptyCart } from 'src/app/store/actions/cart/cart.actions';
import { cartSelector } from 'src/app/store/selectors/cart/cart.selectors';
import { usersSelector } from 'src/app/store/selectors/user/user.selectors';
import { Cart } from '../../../../../shared/models/cart.model';
import { Food } from '../../../../../shared/models/food.model';
import { User } from '../../../../../shared/models/user.model';
import { StripeService,Elements,Element as StripeElement, ElementsOptions} from "ngx-stripe"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  cart$ : Observable<Cart | null>
  user$ : Observable<User[]>
  strikeCheckout:any = null;

  elements!:Elements;
  card!:StripeElement;
  paymentStatus:any
  stripeData:any;
  submitted:any;
  loading:any

   elementsOptions: ElementsOptions = {
     locale:'en'

  };
  //stripeForm: FormGroup;
  constructor(private store: Store<AppState>, private cartService:CartService,
    private fb: FormBuilder,
    private stripeService:StripeService
) {
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
        console.log(stripeToken,"New token generated")
        alert('Stripe token generated!');
        this.cartService.payment(amount!*100 ,stripeToken.id).subscribe(()=>{

          this.emptyCart(cart)
        })

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


































  //   this.loading = false;
  //   this.createForm();
  //   this.stripeService.elements(this.elementsOptions)
  //   .subscribe(elements=>{
  //     this.elements=elements;
  //     if(!this.card){
  //       this.card = this.elements.create('card',{
  //         iconStyle:'solid',
  //         style:{
  //           base:{
  //             iconColor:'#666EE8',
  //             color: '#31325F',
  //             lineHeight:'40px',
  //             fontWeight:300,
  //             fontFamily:'"Helvetica Neue", Helvetica, sans-serif',
  //             fontSize:'18px',
  //             '::placeholder':{
  //               color:'#CFD7E0'
  //             }
  //           }
  //         }
  //       });
  //       this.card.mount('#card-element')
  //     }
  //   });
  // }
  // createForm(){
  //   this.stripeForm = this.fb.group({
  //     name:['', [Validators.required]],
  //     amount:['',[Validators.required]]
  //   });
  // }
  // buy(){
  //   this.submitted = true;
  //   this.loading = true;
  //   this.stripeData = this.stripeForm.value
  //   this.stripeService
  //   .createToken(this.card,{ name })
  //   .subscribe(result=>{
  //     if(result.token){
  //       this.stripeData['token']=result.token
  //       this.cartService.payment(this.stripeData).subscribe((res)=>{
  //         if(res['success']){
  //           this.loading = false;
  //           this.submitted=false;
  //           this.paymentStatus=res['status']
  //         }
  //         else{
  //           this.loading=false;
  //           this.submitted = false;
  //           this.paymentStatus=res['status']
  //         }
  //       })
  //     }else if(result.error){
  //       this.paymentStatus=result.error.message
  //     }
  //   });
  // }
