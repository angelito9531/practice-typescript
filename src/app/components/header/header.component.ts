import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/shared/services/shopping-cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  goToCheckout():void{
    this.router.navigate(['/checkout'])
  }

}
