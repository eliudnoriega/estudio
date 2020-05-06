export class SurveyModel {
  key?: string;
  name?: string;
  surveyType?: number;
  directedPublic?: string;
  type?: string;
  user?: string;
  disabledSurvey?: boolean;
  questions?: Array<QuestionModel>;
}

export class QuestionModel {
  key: string;
  question: string;
  questionType: number;
  possibleAnswers: string;
  accept: string;
  surveyKey: string;
  section: string;
  required: boolean;
  type: string;
}
