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

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductsListComponent,
    ProductComponent
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
    PortalModule
  ],
  providers: [
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
