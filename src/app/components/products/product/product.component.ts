import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Product} from '@models/product';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  form: FormGroup;

  constructor(
    private readonly productService: ProductService,
    private readonly formBuilder: FormBuilder,
    private readonly snackBar: MatSnackBar
  ) {

  }

  ngOnInit(): void {
    this.resetForm();
    this.productService.getProducts();
  }

  saveForm(): void {
    const product: Product = this.form.value;
    this.productService.insertProduct(product);
    this.openSnackBar('Guardado Exitosamente');
    this.resetForm();
  }

  resetForm(): void {
    this.form = this.formBuilder.group({
      name: [''],
      category: [''],
      location: [''],
      price: ['']
    });
    this.productService.selectedProduct = new Product();
  }

  openSnackBar(message: string, ): void {
    this.snackBar.open(message, 'ok', {
      duration: 2000,
      verticalPosition: 'top'
    });
  }

}
