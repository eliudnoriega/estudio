import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {QuestionModel, SurveyModel} from '../../../../models/survey';
import {QUESTION_TYPES} from '../../../../constants/aplication';
import {QuestionService} from '../../../../services/question.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

@Component({
  selector: 'app-dialog-add-question',
  templateUrl: './dialog-add-question.component.html',
  styleUrls: ['./dialog-add-question.component.scss']
})
export class DialogAddQuestionComponent implements OnInit {

  loading = false;
  title = 'Agregar Pregunta';
  form: FormGroup;
  questionTypes;
  possibleAnswers = false;
  possibleAnswersList = [];
  selectable = true;
  removable = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    public readonly dialogRef: MatDialogRef<QuestionModel>,
    @Inject(MAT_DIALOG_DATA) public data: QuestionModel,
    private readonly formBuilder: FormBuilder,
    private readonly questionService: QuestionService
  ) {
  }

  ngOnInit(): void {
    this.questionTypes = QUESTION_TYPES;
    this.initForm();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      question: ['', Validators.required],
      questionType: ['', Validators.required],
      possibleAnswers: [''],
      section: ['', Validators.required],
      captcha: ['', Validators.required],
    });
    if (!this.data) {
      this.questionService.changeQuestion(new QuestionModel());
    }
  }

  save(): void {
    this.dialogRef.close(this.form.value);
  }

  verifyPossibleAnswers(): void {
    this.possibleAnswers = this.questionTypes.filter(r => r.value === this.form.controls['questionType'].value)[0].possibleAnswers;
    if (this.possibleAnswers) {
      this.form.get('possibleAnswers').setValidators(Validators.required);
      this.form.get('possibleAnswers').updateValueAndValidity();
    } else {
      this.form.get('possibleAnswers').setValue('');
      this.form.get('possibleAnswers').setValidators(null);
      this.form.get('possibleAnswers').clearValidators();
      this.form.get('possibleAnswers').updateValueAndValidity();
    }
  }

  removePossibleAnswer(r: any): void {
    const index = this.possibleAnswersList.indexOf(r);
    if (index >= 0) {
      this.possibleAnswersList.splice(index, 1);
      this.loadPossibleAnswer();
    }
  }

  addPossibleAnswer(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.possibleAnswersList.push(value.trim());
      this.loadPossibleAnswer();
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  loadPossibleAnswer(): void {
    this.form.get('possibleAnswers').setValue(this.possibleAnswersList.toString());
  }

  resolved(ev): void {
    this.form.get('captcha').setValue(ev);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
