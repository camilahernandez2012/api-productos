import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <h2>Productos</h2>
    <button routerLink="/products/new">Nuevo</button>
    <table *ngIf="products.length; else empty" border="1" cellspacing="0" cellpadding="6">
      <tr><th>Nombre</th><th>Precio</th><th>Stock</th><th>Acciones</th></tr>
      <tr *ngFor="let p of products">
        <td>{{ p.name }}</td>
        <td>{{ p.price | currency }}</td>
        <td>{{ p.stock }}</td>
        <td>
          <button (click)="view(p.id!)">Ver</button>
          <button (click)="edit(p.id!)">Editar</button>
          <button (click)="remove(p.id!)">Eliminar</button>
        </td>
      </tr>
    </table>
    <ng-template #empty><p>No hay productos.</p></ng-template>
  `
})
export class ProductListComponent implements OnInit {
  private api = inject(ProductService);
  private router = inject(Router);
  products: Product[] = [];

  ngOnInit(){ this.load(); }
  load(){ this.api.list().subscribe(r => this.products = r); }
  view(id:number){ this.router.navigate(['/products', id]); }
  edit(id:number){ this.router.navigate(['/products', id, 'edit']); }
  remove(id:number){ if(confirm('¿Eliminar?')) this.api.delete(id).subscribe(()=>this.load()); }
}
