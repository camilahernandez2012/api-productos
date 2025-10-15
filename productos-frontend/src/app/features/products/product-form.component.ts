import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h2>{{ isEdit ? 'Editar' : 'Nuevo' }} producto</h2>
    <form [formGroup]="form" (ngSubmit)="save()">
      <label>Nombre</label>
      <input formControlName="name"/>

      <label>Descripción</label>
      <textarea formControlName="description"></textarea>

      <label>Precio</label>
      <input type="number" step="0.01" formControlName="price"/>

      <label>Stock</label>
      <input type="number" formControlName="stock"/>

      <button type="submit" [disabled]="form.invalid">Guardar</button>
    </form>
  `
})
export class ProductFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private api = inject(ProductService);

  isEdit = false; id?: number;

  form = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
  });

  ngOnInit(){
    const idParam = this.route.snapshot.paramMap.get('id');
    if(idParam && idParam !== 'new'){
      this.isEdit = true; this.id = +idParam;
      this.api.get(this.id).subscribe(p => this.form.patchValue(p));
    }
  }
  save(){
    const dto = this.form.value as any;
    const op = this.isEdit && this.id ? this.api.update(this.id, dto) : this.api.create(dto);
    op.subscribe(()=> this.router.navigate(['/products']));
  }
}
