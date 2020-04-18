import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

const lazyRoutes: Routes = [
  {
    path: 'surveyEdit/:id',
    loadChildren: './survey-edit/survey-edit.module#SurveyEditModule'
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(lazyRoutes)
  ]
})
export class SurveyModule { }
