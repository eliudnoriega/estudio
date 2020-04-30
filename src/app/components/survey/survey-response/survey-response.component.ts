import {Component, OnInit} from '@angular/core';
import {QuestionModel, SurveyModel} from '../../../models/survey';
import {ActivatedRoute, Params} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {SurveyService} from '../../../services/survey.service';
import {QuestionService} from '../../../services/question.service';
import {Subject} from 'rxjs';
import {FormGroup, Validators} from '@angular/forms';
import {QUESTION_TYPES} from '../../../constants/aplication';

@Component({
  selector: 'app-survey-response',
  templateUrl: './survey-response.component.html',
  styleUrls: ['./survey-response.component.scss']
})
export class SurveyResponseComponent implements OnInit {

  private readonly unsubscribeAll = new Subject<boolean>();
  key: string;
  questionsList: Array<QuestionModel> = [];
  x: SurveyModel = {questions: []};
  form: FormGroup;

  constructor(
    private readonly surveyService: SurveyService,
    private readonly questionService: QuestionService,
    private activatedRoute: ActivatedRoute
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
          q['type'] = QUESTION_TYPES.filter(r => r.value === q['questionType'])[0].type;
          this.questionService.changeSection(q['section']);
          this.questionsList.push(q as QuestionModel);
          if (q['questionType'] === 3) {
            console.log(q);
          }
        });
        this.form = this.formBuilder.group({

          captcha: ['', Validators.required],
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

}
