import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LayoutDialogComponent} from './layout-dialog/layout-dialog.component';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {PortalModule} from '@angular/cdk/portal';
import {FlexModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { LayoutPageComponent } from './layout-page/layout-page.component';
import { LayoutMenuComponent } from './layout-menu/layout-menu.component';
import {RouterModule} from '@angular/router';
import {BsDropdownModule, CollapseModule} from 'ngx-bootstrap';



@NgModule({
  declarations: [LayoutDialogComponent, LayoutPageComponent, LayoutMenuComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressBarModule,
    PortalModule,
    FlexModule,
    MatButtonModule,
    MatDialogModule,
    RouterModule,
    CollapseModule,
    BsDropdownModule.forRoot(),
  ],
  exports: [
    LayoutDialogComponent,
    LayoutMenuComponent
  ]
})
export class LayoutsModule { }
