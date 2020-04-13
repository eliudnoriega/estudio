import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AgGridIconButtonActionComponent} from '@components/ag-grid/ag-grid-icon-button-action.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';


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
