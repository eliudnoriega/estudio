import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Product} from '@models/product';
import {MatSnackBar} from '@angular/material/snack-bar';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  form: FormGroup;
  private readonly unsubscribeAll = new Subject<boolean>();

  constructor(
    private readonly productService: ProductService,
    private readonly formBuilder: FormBuilder,
    private readonly snackBar: MatSnackBar
  ) {

  }

  ngOnInit(): void {
    this.resetForm();
    this.productService.getProducts();

    this.productService.currentProduct
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(product => {
        if (product) {
          this.form = this.formBuilder.group({
            key: [product.key],
            name: [product.name],
            category: [product.category],
            location: [product.location],
            price: [product.price]
          });
        }
      });

  }

  saveForm(): void {
    const product: Product = this.form.value;
    if (product.key) {
      this.productService.updateProduct(product);
    } else {
      this.productService.insertProduct(product);
    }

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
    this.form.reset();
    this.productService.changeProduct(new Product());
  }

  openSnackBar(message: string,): void {
    this.snackBar.open(message, 'ok', {
      duration: 2000,
      verticalPosition: 'top'
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(true);
    this.unsubscribeAll.complete();
  }

}
