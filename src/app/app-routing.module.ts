import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';

import {IndexComponent} from './pages/index/index.component';
import {ProfilepageComponent} from './pages/examples/profilepage/profilepage.component';
import {RegisterpageComponent} from './pages/examples/registerpage/registerpage.component';
import {LandingpageComponent} from './pages/examples/landingpage/landingpage.component';
import {AddQuestionsComponent} from './components/survey/add-questions/add-questions.component';
import {SurveyResponseComponent} from './components/survey/survey-response/survey-response.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'home', component: IndexComponent },
  {path: 'profile', component: ProfilepageComponent },
  {path: 'register', component: RegisterpageComponent },
  {path: 'landing', component: LandingpageComponent },
  {path: 'addQuestions/:key', component: AddQuestionsComponent},
  {path: 'surveyResponse/:key', component: SurveyResponseComponent}
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: []
})
export class AppRoutingModule {}
