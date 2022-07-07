import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { ShoppingCartService } from 'src/shared/services/shopping-cart.service';
import { Product } from './product/interfaces/product.interface';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products! : Product[];
  constructor(private productAPI:ProductsService,private shoppingService : ShoppingCartService) { }

  ngOnInit(): void {
    this.productAPI.getProducts()
    .pipe(
      tap((products:Product[]) => this.products = products)
    )
    .subscribe()
  }
  addToCart(product:Product):void{
    console.log("ADD CART",product);
    this.shoppingService.updateCart(product)

  }

}
