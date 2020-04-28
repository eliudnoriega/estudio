import {Injectable} from '@angular/core';
import {SurveyModel} from '../models/survey';
import {BehaviorSubject, Observable} from 'rxjs';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  surveyList: AngularFireList<any>;
  private readonly currentSurveySubject = new BehaviorSubject<SurveyModel>(null);
  private readonly currentSurveyListSubject = new BehaviorSubject<Array<SurveyModel>>(null);

  constructor(
    private firebase: AngularFireDatabase,
    private userService: UserService
  ) {
  }

  getSurveys(): AngularFireList<any> {
    return this.surveyList = this.firebase.list('survey');
  }

  saveSurvey(survey: SurveyModel): void {
    this.surveyList.push({
      name: survey.name,
      surveyType: survey.surveyType,
      directedPublic: survey.directedPublic,
      disabledSurvey: survey.disabledSurvey,
      user: this.userService.currentUser.email
    });
  }

  updateSurvey(survey: SurveyModel): void {
    this.surveyList.update(survey.key, {
      name: survey.name,
      surveyType: survey.surveyType,
      directedPublic: survey.directedPublic,
      disabledSurvey: survey.disabledSurvey,
      user: this.userService.currentUser.email,
      questions: survey.questions ? survey.questions : [],
      key: survey.key
    });
  }

  changeSurvey(survey: SurveyModel): void {
    this.currentSurveySubject.next(survey);
  }

  public get currentSurvey(): Observable<SurveyModel> {
    return this.currentSurveySubject.asObservable();
  }

  public get currentSurveyList(): Observable<Array<SurveyModel>> {
    return this.currentSurveyListSubject.asObservable();
  }

  getByKey(key: string): any {
    return this.firebase.list('survey', ref => {
      return ref.orderByChild('key').equalTo(key);
    });
  }
}
