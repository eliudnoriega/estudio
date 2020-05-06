import {Component, OnInit} from '@angular/core';
import {QuestionModel, SurveyModel} from '../../../models/survey';
import {ActivatedRoute, Params} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {SurveyService} from '../../../services/survey.service';
import {QuestionService} from '../../../services/question.service';
import {Subject} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QUESTION_TYPES, SITE_KEY} from '../../../constants/aplication';
import {UserService} from '../../../services/user.service';

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
  siteKey = '';
  sections = [];

  constructor(
    private readonly surveyService: SurveyService,
    private readonly questionService: QuestionService,
    private activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.key = params.key;
    });
    const propertiesForm: any = {};
    propertiesForm.captcha = ['', Validators.required];
    this.form = this.formBuilder.group(
      propertiesForm
    );
    this.questionService.getQuestions(this.key).snapshotChanges()
      .subscribe(item => {
        this.questionsList = [];
        item.forEach(element => {
          const q = element.payload.toJSON();
          q['key'] = element.key;
          q['type'] = QUESTION_TYPES.filter(r => r.value === q['questionType'])[0].type;
          this.questionService.changeSection(q['section']);
          this.questionsList.push(q as QuestionModel);
          if (q['questionType'] === 5) {
            const b: any = q['possibleAnswers'];
            const possAnswerList: any = [];
            for (const i in b) {
              possAnswerList.push(q['possibleAnswers'][i]);
            }
            q['possibleAnswers'] = possAnswerList;
            console.log(possAnswerList);
          }
          if (q['required']) {
            propertiesForm[element.key] = ['', Validators.required];
          } else {
            propertiesForm[element.key] = [''];
          }
        });
        this.sections = this.questionsList.map(r => r.section).filter((r, i, self) => self.indexOf(r) === i);
        console.log(this.sections);
        this.form = this.formBuilder.group(
          propertiesForm
        );
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
    this.siteKey = SITE_KEY;
  }

  resolved(ev): void {
    this.form.get('captcha').setValue(ev);
  }

  addCheckValue(key: string, value: string, ev: any): void {
    setTimeout(() => {
      if (value && this.form.controls[key].value && ev.checked) {
        this.form.get(key).setValue(this.form.controls[key].value + ',' + value);
      } else if (value && this.form.controls[key].value && !ev.checked) {
        const arr = this.form.controls[key].value.split(',');
        const i = arr.indexOf(value);
        arr.splice(i, 1);
        this.form.get(key).setValue(arr.toString());
      } else {
        this.form.get(key).setValue(value);
      }
    }, 200);
  }

  uploadFile(ev: any): void {
    if(ev.target && ev.target.files){
      console.log(ev.target.files);
    }
  }

  saveForm(): void {
    console.log(this.form.value);
  }

}
