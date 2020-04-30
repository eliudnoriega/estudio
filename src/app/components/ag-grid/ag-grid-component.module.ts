import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import {AgGridIconButtonActionComponent} from './ag-grid-icon-button-action.component';
import {AgGridQuestionTypeComponent} from './ag-grid-question-type.component';
import {AgGridQuestionPossibleAnswersComponent} from './ag-grid-question-possible-answers.component';
import {AgGridIconComponent} from './ag-grid-icon.component';


@NgModule({
  declarations: [AgGridIconButtonActionComponent, AgGridQuestionTypeComponent, AgGridQuestionPossibleAnswersComponent, AgGridIconComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatTooltipModule
  ],
  exports: [
    AgGridIconButtonActionComponent,
    AgGridQuestionTypeComponent,
    AgGridQuestionPossibleAnswersComponent,
    AgGridIconComponent
  ]
})
export class AgGridComponentModule {
}
