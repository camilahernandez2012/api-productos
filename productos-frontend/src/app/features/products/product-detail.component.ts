import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <a routerLink="/products">← Volver</a>
    <h2>Detalle</h2>
    <div *ngIf="p">
      <p><b>Nombre:</b> {{ p.name }}</p>
      <p><b>Descripción:</b> {{ p.description || '—' }}</p>
      <p><b>Precio:</b> {{ p.price | currency }}</p>
      <p><b>Stock:</b> {{ p.stock }}</p>
    </div>
  `
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private api = inject(ProductService);
  p?: Product;

  ngOnInit(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.api.get(id).subscribe(res => this.p = res);
  }
}
