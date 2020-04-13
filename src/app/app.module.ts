import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AngularFireModule} from 'angularfire2/';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {environment} from '../environments/environment';
import {ProductsComponent} from './components/products/products.component';
import {ProductsListComponent} from './components/products/products-list/products-list.component';
import {ProductComponent} from './components/products/product/product.component';

import {ProductService} from './services/product.service';
import {MatSidenavModule} from '@angular/material/sidenav';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {PortalModule} from '@angular/cdk/portal';
import {CustonSinedavComponent} from './components/custon-sinedav/custon-sinedav.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {AgGridModule} from '@ag-grid-community/angular';
import {LayoutModule} from '@angular/cdk/layout';
import {AgGridComponentModule} from '@components/ag-grid/ag-grid-component.module';
import {AgGridIconButtonActionComponent} from '@components/ag-grid/ag-grid-icon-button-action.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductsListComponent,
    ProductComponent,
    CustonSinedavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatListModule,
    MatMenuModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatTableModule,
    MatTabsModule,
    PortalModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    FlexModule,
    LayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    AgGridModule.withComponents([]),
    AgGridComponentModule
  ],
  providers: [
    ProductService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    CustonSinedavComponent,
    AgGridIconButtonActionComponent
  ]
})
export class AppModule {
}
