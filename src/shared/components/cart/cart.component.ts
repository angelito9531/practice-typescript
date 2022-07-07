import { Component, OnInit } from "@angular/core";
import { ShoppingCartService } from "src/shared/services/shopping-cart.service";

@Component({
    selector:"cart-app",
    templateUrl:"./cart.component.html",
    styleUrls:["./cart.component.scss"]
})
export class CartComponent implements OnInit{
    quantity =this.shoppingCartService.quantityAction;
    total=this.shoppingCartService.totalAction;
    cart=this.shoppingCartService.cartAction;
    constructor(private shoppingCartService : ShoppingCartService){

    }

    ngOnInit(): void {
        
    }
}