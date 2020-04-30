import {Component} from '@angular/core';
import {ICellRendererAngularComp} from '@ag-grid-community/angular';
import {QUESTION_TYPES} from '../../constants/aplication';

@Component({
  selector: 'app-ag-grid-icon-button-action',
  template: `
      <div>{{questionType}}</div>
  `,
  styles: [
      `
          .action-icon-button {
              color: #757575;
          }
    `,
  ],
})
export class AgGridQuestionTypeComponent
  implements ICellRendererAngularComp {
  private params: any;
  cell: any;
  questionType = '';

  constructor() {
  }

  agInit(params: any): void {
    this.params = params;
    this.cell = {row: params.value, col: params.colDef.headerName};
    this.questionType = QUESTION_TYPES.filter(r => r.value === params.value)[0].text;
  }

  refresh(): boolean {
    return false;
  }

}
