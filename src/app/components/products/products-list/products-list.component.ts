import {Component, OnInit} from '@angular/core';
import {Product} from '@models/product';
import {ProductService} from '../../../services/product.service';
import {MenuModule} from '@ag-grid-enterprise/menu';
import {ColumnsToolPanelModule} from '@ag-grid-enterprise/column-tool-panel';
import {InfiniteRowModelModule} from '@ag-grid-community/infinite-row-model';
import {ClientSideRowModelModule} from '@ag-grid-community/client-side-row-model';
import {GridApi} from '@ag-grid-community/core';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  modules = [MenuModule, ColumnsToolPanelModule, InfiniteRowModelModule, ClientSideRowModelModule];
  products: Array<Product> = [];
  defaultColDef = {
    resizable: true,
  };
  rowSelection = 'multiple';
  columnDefs = [
    {
      headerName: 'Nombre del producto',
      field: 'name',
      width: 200,
      sortable: true,
      pinned: 'left'
    },
    {
      headerName: 'Categoría del producto',
      field: 'category',
      width: 200,
      sortable: true
    },
    {
      headerName: 'Ubicación del producto',
      field: 'location',
      width: 200,
      sortable: true
    },
    {
      headerName: 'Precio',
      field: 'location',
      width: 150,
      sortable: true,
      cellStyle: {
        'text-align': 'center',
      }
    }
  ];

  gridApi: GridApi;

  constructor(private readonly productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.getProducts()
      .snapshotChanges()
      .subscribe(item => {
        this.products = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          x['key'] = element.key;
          this.products.push(x as Product);
        });
      });
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridApi.resetRowHeights();
  }

}
