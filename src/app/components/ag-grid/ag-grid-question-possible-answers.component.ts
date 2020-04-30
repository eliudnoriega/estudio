import {Component} from '@angular/core';
import {ICellRendererAngularComp} from '@ag-grid-community/angular';
import {QUESTION_TYPES} from '../../constants/aplication';

@Component({
  selector: 'app-ag-grid-icon-button-action',
  template: `
      <div>{{value}}</div>
  `,
  styles: [
      `
          .action-icon-button {
              color: #757575;
          }
    `,
  ],
})
export class AgGridQuestionPossibleAnswersComponent
  implements ICellRendererAngularComp {
  private params: any;
  cell: any;
  questionType = {};
  data = {};
  value = '';

  constructor() {
  }

  agInit(params: any): void {
    this.params = params;
    this.cell = {row: params.value, col: params.colDef.headerName};
    if (params.data.questionType === 5) {
      for (const i in params.value) {
        this.value += params.value[i].description + ',';
      }
    } else {
      this.value = params.value.toString();
    }

  }

  refresh(): boolean {
    return false;
  }

}
