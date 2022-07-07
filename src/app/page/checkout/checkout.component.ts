import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { delay, switchMap, tap } from 'rxjs';
import { Order,Details } from 'src/shared/interfaces/order.interface';
import { Store } from 'src/shared/interfaces/store.interface';
import { DataService } from 'src/shared/services/data.service';
import { ShoppingCartService } from 'src/shared/services/shopping-cart.service';
import { Product } from '../products/product/interfaces/product.interface';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  pickup!:string;
  isDelivery:Boolean = true;
  cart :Product[] =[];
  model = {
    name:null,
    store:null,
    shippingAddress:null,
    city:null  
  }
  stores: Store[] = [];
  
  constructor(
    private dataService: DataService,
    private shoppingcart : ShoppingCartService,
    private router: Router) { }

  ngOnInit(): void {
    this.getStores();
    this.getDataCart();
    this.prepareDetails();
  }

  onPickupOrDelivery(value:boolean):void{
    this.isDelivery = value;
  }

  private getStores():void{
    this.dataService.getStores()
    .pipe(
      tap((stores:Store[]) => this.stores= stores)
    )
    .subscribe()
  }

  onSubmit({value:formData}: NgForm):void{
    console.log("guardar",formData)
    const data : Order={
      ...formData,
      date:this.getCurrentDay(),
      isDelivery:this.isDelivery
    }
    this.dataService.saveOrder(data)
    .pipe(
      tap(res => console.log(res)),
      switchMap((order) => {
        const orderId = order.id;
        const details = this.prepareDetails();
        return this.dataService.saveDetailsOrder({details,orderId})
      }),
      tap(() => this.router.navigate(['/checkout/thank-you-page'])),
      delay(2000),
      tap(() => this.shoppingcart.resetCart())
    )
    .subscribe()
  } 

  private getCurrentDay():string{
    return new Date().toLocaleDateString();
  }

  private prepareDetails():Details[]{
    const details : Details[] = [];
    this.cart.forEach((product:Product) =>{
      const {id:productId,name:productName,qty:quantity,stock} = product;

      details.push({productId,productName,quantity})
    })
    return details
  }

  private getDataCart():void{
    this.shoppingcart.cartAction
    .pipe(
      tap((products: Product[]) => this.cart = products)
    )
    .subscribe()
  }

}
