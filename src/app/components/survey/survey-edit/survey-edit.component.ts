import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SurveyService} from '../../../services/survey.service';
import {Survey} from '../../../models/survey';
import {COMPANIAS_TELEFONICAS} from '../../../constants/aplication';

@Component({
  selector: 'app-survey-edit',
  templateUrl: './survey-edit.component.html',
  styleUrls: ['./survey-edit.component.scss']
})
export class SurveyEditComponent implements OnInit {
  form: FormGroup;
  isLinear = false;
  companiasTelefonicas: Array<any>;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly surverService: SurveyService
  ) {
  }

  ngOnInit(): void {
    this.resetForm();
    this.companiasTelefonicas = COMPANIAS_TELEFONICAS;
  }

  resetForm(): void {
    this.form = this.formBuilder.group({
      name: [''],
      category: [''],
      location: [''],
      price: ['']
    });
    this.form.reset();
    this.surverService.changeSurvey(new Survey());
  }

  saveForm(): void {

  }

}
