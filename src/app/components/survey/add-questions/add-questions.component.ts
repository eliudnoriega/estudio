import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {SurveyService} from '../../../services/survey.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {QuestionModel, SurveyModel} from '../../../models/survey';
import {MenuModule} from '@ag-grid-enterprise/menu';
import {ColumnsToolPanelModule} from '@ag-grid-enterprise/column-tool-panel';
import {InfiniteRowModelModule} from '@ag-grid-community/infinite-row-model';
import {ClientSideRowModelModule} from '@ag-grid-community/client-side-row-model';
import {GridApi} from '@ag-grid-community/core';
import {QuestionService} from '../../../services/question.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogAddQuestionComponent} from './dialog-add-question/dialog-add-question.component';
import {AgGridIconButtonActionComponent} from '../../ag-grid/ag-grid-icon-button-action.component';
import {AgGridQuestionTypeComponent} from '../../ag-grid/ag-grid-question-type.component';
import {ConfirmationDialogComponent} from '../../layout/confirmation-dialog/confirmation-dialog.component';
import {AgGridQuestionPossibleAnswersComponent} from '../../ag-grid/ag-grid-question-possible-answers.component';
import {AgGridIconComponent} from '../../ag-grid/ag-grid-icon.component';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.scss']
})
export class AddQuestionsComponent implements OnInit, OnDestroy {

  private readonly unsubscribeAll = new Subject<boolean>();
  key: string;

  modules = [MenuModule, ColumnsToolPanelModule, InfiniteRowModelModule, ClientSideRowModelModule];

  x: SurveyModel = {questions: []};
  questionsList: Array<QuestionModel> = [];
  defaultColDef = {
    resizable: true,
  };
  rowSelection = 'multiple';
  gridOptions = {
    suppressPropertyNamesCheck: true,
    rowHeight: 40
  };
  columnDefs = [
    {
      headerName: 'Pregunta',
      field: 'question',
      width: 200,
      sortable: true,
      pinned: 'left'
    },
    {
      headerName: 'Tipo de pregunta',
      field: 'questionType',
      width: 200,
      sortable: true,
      cellStyle: {
        'text-align': 'center',
      },
      cellRendererFramework: AgGridQuestionTypeComponent
    },
    {
      headerName: 'Posibles respuestas',
      field: 'possibleAnswers',
      width: 200,
      sortable: true,
      cellRendererFramework: AgGridQuestionPossibleAnswersComponent
    },
    {
      headerName: 'Tipos de Archivos',
      field: 'accept',
      width: 200,
      sortable: true,
      cellRendererFramework: AgGridQuestionPossibleAnswersComponent
    },
    {
      headerName: 'Es Requerido',
      field: 'required',
      width: 200,
      sortable: true,
      cellRendererFramework: AgGridIconComponent,
      cellRendererParams: {
        iconName: 'check'
      }
    },
    {
      headerName: 'Editar',
      field: 'key',
      width: 100,
      sortable: true,
      cellStyle: {
        'text-align': 'center',
      },
      cellRendererFramework: AgGridIconButtonActionComponent,
      cellRendererParams: {
        buttonTitle: 'Editar',
        iconName: 'edit',
        validateShowGridButton: (data: QuestionModel) => data.key,
        onAction: (data: any) => this.editQuestion(data),
      },
      pinned: 'right'
    },
    {
      headerName: 'Eliminar',
      field: 'key',
      width: 100,
      sortable: true,
      cellStyle: {
        'text-align': 'center',
      },
      cellRendererFramework: AgGridIconButtonActionComponent,
      cellRendererParams: {
        buttonTitle: 'Eliminar',
        iconName: 'remove_circle',
        color: 'warn',
        validateShowGridButton: (data: QuestionModel) => data.key,
        onAction: (data: any) => this.goToDeleteQuestion(data),
      },
      pinned: 'right'
    }
  ];

  gridApi: GridApi;

  constructor(
    private readonly surveyService: SurveyService,
    private readonly questionService: QuestionService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.key = params['key'];
    });
    this.questionService.getQuestions(this.key).snapshotChanges()
      .subscribe(item => {
        this.questionsList = [];
        item.forEach(element => {
          const q = element.payload.toJSON();
          q['key'] = element.key;
          this.questionService.changeSection(q['section']);
          this.questionsList.push(q as QuestionModel);
        });
      });
    this.surveyService.currentSurvey
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(survey => {
        if (survey && survey.key) {
          this.x = survey;
        } else {
          this.surveyService.getByKey(this.key).snapshotChanges()
            .subscribe(item => {
              const e = item[0].payload.toJSON();
              e['key'] = item[0].key;
              this.x = (e as SurveyModel);
            });
        }
      });
  }


  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridApi.resetRowHeights();
  }

  editQuestion(question: QuestionModel): void {
    if (question) {
      this.questionService.changeQuestion(question);
    }
    const dialogRef = this.dialog.open(DialogAddQuestionComponent, {
      height: '570px',
      width: '600px',
      panelClass: 'mat-dialog-without-padding',
      data: question
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.section) {
        this.questionService.changeSection(result.section);
      }
      if (result && result.key) {
        this.questionService.updateSurvey((result as QuestionModel));
      } else if (result) {
        const qs = (result as QuestionModel);
        qs.surveyKey = this.key;
        delete result.captcha;
        this.questionService.saveSurvey(qs);
      }
    });
  }

  goToDeleteQuestion(data: QuestionModel): void {
    const confirmChangeStatus = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {title: 'Eliminar pregunta', question: `¿Desea eliminar esta pregunta?`},
    });

    confirmChangeStatus.afterClosed().subscribe(result => {
      if (result) {
        this.questionService.deleteQuestion(data.key);
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(true);
    this.unsubscribeAll.complete();
  }

}
