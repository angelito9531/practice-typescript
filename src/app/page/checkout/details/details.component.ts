import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/shared/services/shopping-cart.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  total = this.shoppingCart.totalAction;
  cart = this.shoppingCart.cartAction;  

  constructor(private shoppingCart: ShoppingCartService) { }

  ngOnInit(): void {
  }

}
