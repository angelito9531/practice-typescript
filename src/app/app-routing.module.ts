import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'products', 
    loadChildren: () => import('./page/products/products.module').then(m => m.ProductsModule) 
  },
  { path: 'checkout', loadChildren: () => import('./page/checkout/checkout.module').then(m => m.CheckoutModule) },

  { path: '', redirectTo:'/products', pathMatch:'full'},
  { path: '**', redirectTo:'', pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
