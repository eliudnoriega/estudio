import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {QuestionModel, SurveyModel} from '../models/survey';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {UserService} from './user.service';

@Injectable()
export class QuestionService {
  questionsList: AngularFireList<any>;
  private readonly currentQuestionSubject = new BehaviorSubject<QuestionModel>(null);
  private readonly sectionSubject = new BehaviorSubject<string>('');

  constructor(
    private firebase: AngularFireDatabase,
    private userService: UserService
  ) {
  }

  getQuestions(key: string): AngularFireList<any> {
    return this.questionsList = this.firebase.list('survey/' + key + '/questions');
  }

  saveSurvey(question: QuestionModel): void {
    this.questionsList.push({
      question: question.question,
      questionType: question.questionType,
      surveyKey: question.surveyKey,
      possibleAnswers: question.possibleAnswers,
      accept: question.accept,
      user: this.userService.currentUser.email,
      required: question.required,
      section: question.section
    });
  }

  updateSurvey(question: QuestionModel): void {
    this.questionsList.update(question.key, {
      question: question.question,
      questionType: question.questionType,
      surveyKey: question.surveyKey,
      possibleAnswers: question.possibleAnswers,
      accept: question.accept,
      user: this.userService.currentUser.email,
      key: question.key,
      required: question.required,
      section: question.section
    });
  }

  changeQuestion(question: QuestionModel): void {
    this.currentQuestionSubject.next(question);
  }

  public get currentSurvey(): Observable<QuestionModel> {
    return this.currentQuestionSubject.asObservable();
  }

  changeSection(section: string): void {
    this.sectionSubject.next(section);
  }

  public get currentSection(): Observable<string> {
    return this.sectionSubject.asObservable();
  }

  deleteQuestion(key: string) {
    this.questionsList.remove(key);
  }

  getBySurveyKey(key: string): any {
    return this.firebase.list('question', ref => {
      return ref.orderByChild('surveyKey').equalTo(key);
    });
  }
}
