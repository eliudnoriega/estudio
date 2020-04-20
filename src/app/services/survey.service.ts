import {Injectable} from '@angular/core';
import {Survey} from '../models/survey';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  selectedSurvey: Survey = new Survey();
  private readonly currentSurveySubject = new BehaviorSubject<Survey>(null);

  constructor() {
  }

  changeSurvey(survey: Survey): void {
    this.currentSurveySubject.next(survey);
  }
}
