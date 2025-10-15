import { Routes } from '@angular/router';
import { ProductListComponent } from './features/products/product-list.component';
import { ProductFormComponent } from './features/products/product-form.component';
import { ProductDetailComponent } from './features/products/product-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductListComponent },
  { path: 'products/new', component: ProductFormComponent },
  { path: 'products/:id/edit', component: ProductFormComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: '**', redirectTo: '' }
];
