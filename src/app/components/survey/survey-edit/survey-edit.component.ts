import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SurveyService} from '../../../services/survey.service';
import {SurveyModel} from '../../../models/survey';
import {COMPANIAS_TELEFONICAS} from '../../../constants/aplication';

@Component({
  selector: 'app-survey-edit',
  templateUrl: './survey-edit.component.html',
  styleUrls: ['./survey-edit.component.scss']
})
export class SurveyEditComponent implements OnInit {
  formNumber: FormGroup;
  form: FormGroup;
  isLinear = false;
  numeroBoleta = 0;
  companiasTelefonicas: Array<any>;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly surveyService: SurveyService
  ) {
  }

  ngOnInit(): void {
    this.resetForm();
    this.companiasTelefonicas = COMPANIAS_TELEFONICAS;
  }

  resetForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      location: ['', Validators.required],
      price: ['', Validators.required]
    });
    this.formNumber = this.formBuilder.group({
      numeroBoleta: ['', Validators.required]
    });
    this.form.reset();
    this.surveyService.changeSurvey(new SurveyModel());
  }

  saveForm(): void {
    console.log('hola');
  }

}
