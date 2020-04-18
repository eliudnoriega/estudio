import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyEditComponent } from './survey-edit.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: SurveyEditComponent,
    resolve: {}
  },
];

@NgModule({
  declarations: [SurveyEditComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SurveyEditModule { }
