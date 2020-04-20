import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyEditComponent } from './survey-edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FlexModule} from '@angular/flex-layout';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [SurveyEditComponent],
  exports: [
    SurveyEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FlexModule,
    MatInputModule,
    MatButtonModule,
    MatStepperModule,
    MatSelectModule
  ]
})
export class SurveyEditModule { }
