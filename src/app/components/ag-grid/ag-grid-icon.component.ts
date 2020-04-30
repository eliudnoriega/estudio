import {Component} from '@angular/core';
import {ICellRendererAngularComp} from '@ag-grid-community/angular';

@Component({
  selector: 'app-ag-grid-icon-button-action',
  template: `
      <div>
          <mat-icon aria-label="action button icon">{{iconName}}</mat-icon>
      </div>
  `,
  styles: [
      `
          .action-icon-button {
              color: #757575;
          }
    `,
  ],
})
export class AgGridIconComponent
  implements ICellRendererAngularComp {
  private params: any;
  cell: any;
  iconName = 'cancel';

  constructor() {
  }

  agInit(params: any): void {
    this.params = params;
    this.cell = {row: params.value, col: params.colDef.headerName};
    if (params.iconName && params.value) {
      this.iconName = params.iconName;
    }

  }

  refresh(): boolean {
    return false;
  }

}
