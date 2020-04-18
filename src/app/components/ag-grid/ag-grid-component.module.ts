import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import {AgGridIconButtonActionComponent} from './ag-grid-icon-button-action.component';


@NgModule({
  declarations: [AgGridIconButtonActionComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatTooltipModule
  ],
  exports: [
    AgGridIconButtonActionComponent
  ]
})
export class AgGridComponentModule {
}
