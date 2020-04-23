import {Component, OnInit} from '@angular/core';
import {AddSurveyComponent} from './add-survey/add-survey.component';
import {MatDialog} from '@angular/material/dialog';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/product';
import {SurveyService} from '../../services/survey.service';
import {SurveyModel} from '../../models/survey';
import {SURVEY_TYPES} from '../../constants/aplication';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {

  surveyList: Array<SurveyModel>;

  constructor(
    public dialog: MatDialog,
    private readonly productService: ProductService,
    private readonly surveyService: SurveyService
  ) {
  }

  ngOnInit(): void {
    this.surveyService.getSurveys()
      .snapshotChanges()
      .subscribe(item => {
        this.surveyList = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          x['key'] = element.key;
          x['type'] = SURVEY_TYPES.filter((r, i, a) => {
            return r.value === x['surveyType'];
          })[0].text;
          this.surveyList.push(x as SurveyModel);
        });
      });
  }

  editSurvey(survey: SurveyModel): void {
    this.surveyService.changeSurvey(survey);
    const dialogRef = this.dialog.open(AddSurveyComponent, {
      height: '520px',
      width: '600px',
      panelClass: 'mat-dialog-without-padding',
      data: survey
    });

    dialogRef.afterClosed().subscribe(result => {
      this.surveyService.changeSurvey(new SurveyModel());
    });
  }


}
