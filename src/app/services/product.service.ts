import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Product} from '../models/product';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class ProductService {

  productList: AngularFireList<any>;
  private readonly currentProductSubject = new BehaviorSubject<Product>(null);
  selectedProduct: Product = new Product();


  constructor(private firebase: AngularFireDatabase) {
  }

  getProducts(): AngularFireList<any> {
    return this.productList = this.firebase.list('products');
  }

  insertProduct(product: Product): void {
    this.productList.push({
      name: product.name,
      category: product.category,
      location: product.location,
      price: product.price
    });
  }

  updateProduct(product: Product): void {
    this.productList.update(product.key, {
      name: product.name,
      category: product.category,
      location: product.location,
      price: product.price
    });
  }

  deleteProduct(key: string) {
    this.productList.remove(key);
  }

  changeProduct(product: Product): void {
    this.currentProductSubject.next(product);
  }

  public get currentProduct(): Observable<Product> {
    return this.currentProductSubject.asObservable();
  }

}
