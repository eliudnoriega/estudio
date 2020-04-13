import { Component } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';

@Component({
  selector: 'app-ag-grid-icon-button-action',
  template: `
    <button
      *ngIf="showButton"
      (click)="onClick()"
      mat-icon-button
      [title]="buttonTitle"
      color="{{ color }}"
    >
      <mat-icon
        *ngIf="!color"
        class="action-icon-button"
        aria-label="action button icon"
        >{{ iconName }}</mat-icon
      >
      <mat-icon *ngIf="color" aria-label="action button icon">{{
        iconName
      }}</mat-icon>
    </button>
  `,
  styles: [
    `
      .action-icon-button {
        color: #757575;
      }
    `,
  ],
})
export class AgGridIconButtonActionComponent
  implements ICellRendererAngularComp {
  private params: any;
  cell: any;
  iconName = 'info';
  buttonTitle = 'Action button';
  showButton: boolean = true;
  color: string = 'primary';

  constructor() {}

  agInit(params: any): void {
    this.params = params;
    this.cell = { row: params.value, col: params.colDef.headerName };
    this.iconName = params.iconName;

    if (
      this.params.data &&
      this.params.data.id &&
      this.params['validateShowGridButton']
    ) {
      const fn = this.params['validateShowGridButton'];
      if (fn) {
        this.showButton = fn(this.params.data);
      }
    } else if (
      this.params &&
      this.params.data &&
      this.params.data.id &&
      params.data.id < 0
    ) {
      this.showButton = false;
    }
    if (
      this.params.data &&
      this.params.data.id &&
      this.params['validateTitle']
    ) {
      const fn = this.params['validateTitle'];
      if (fn) {
          this.buttonTitle = this.params.data;
      }
    }

    if (
      this.params.data &&
      this.params.data.id &&
      this.params['validateIcon']
    ) {
      const fn = this.params['validateIcon'];
      if (fn) {
        this.iconName = fn(this.params.data);
      }
    }

    if (
      params.buttonTitle &&
      params.buttonTitle !== null &&
      params.buttonTitle !== ''
    ) {
        this.buttonTitle = params.buttonTitle;
    }
    if (params.color) {
      this.color = params.color;
    }
  }

  refresh(): boolean {
    return false;
  }

  onClick(): void {
    if (this.params) {
      const fn = this.params['onAction'];
      if (fn) {
        fn(this.params.data);
      }
    }
  }
}
