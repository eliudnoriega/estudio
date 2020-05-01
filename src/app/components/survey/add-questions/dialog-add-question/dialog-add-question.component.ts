import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {QuestionModel} from '../../../../models/survey';
import {QUESTION_TYPES, SITE_KEY} from '../../../../constants/aplication';
import {QuestionService} from '../../../../services/question.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {DialogIconComponent} from '../dialog-icon/dialog-icon.component';

@Component({
  selector: 'app-dialog-add-question',
  templateUrl: './dialog-add-question.component.html',
  styleUrls: ['./dialog-add-question.component.scss']
})
export class DialogAddQuestionComponent implements OnInit, OnDestroy {

  private readonly unsubscribeAll = new Subject<boolean>();
  loading = false;
  title = 'Agregar Pregunta';
  icon = 'add';
  form: FormGroup;
  questionTypes;
  possibleAnswers = false;
  possibleAnswersList: any = [];
  selectable = true;
  removable = true;
  sectionList = [];
  siteKey = '';
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    public readonly dialogRef: MatDialogRef<QuestionModel>,
    @Inject(MAT_DIALOG_DATA) public data: QuestionModel,
    private readonly formBuilder: FormBuilder,
    private readonly questionService: QuestionService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.questionTypes = QUESTION_TYPES;
    this.initForm();
    this.siteKey = SITE_KEY;
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      question: ['', Validators.required],
      questionType: ['', Validators.required],
      possibleAnswers: [''],
      required: [''],
      section: ['', Validators.required],
      captcha: ['', Validators.required],
    });
    if (!this.data) {
      this.questionService.changeQuestion(new QuestionModel());
    } else {
      this.form = this.formBuilder.group({
        question: [this.data.question, Validators.required],
        questionType: [this.data.questionType, Validators.required],
        possibleAnswers: [this.data.possibleAnswers],
        section: [this.data.section, Validators.required],
        key: [this.data.key],
        surveyKey: [this.data.surveyKey],
        required: [this.data.required],
        captcha: ['', Validators.required],
      });
      if (this.data.possibleAnswers) {
        this.possibleAnswers = true;
        this.possibleAnswersList = [];
        if (this.form.get('questionType').value === 5) {
          const b: any = this.data.possibleAnswers;
          for (const i in b) {
            this.possibleAnswersList.push(this.data.possibleAnswers[i]);
          }
        } else {
          this.possibleAnswersList = this.data.possibleAnswers.split(',');
        }
      }
    }
    this.questionService.currentSection
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(r => {
        this.sectionList = [];
        this.sectionList.push(r);
      });
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
      if (this.form.get('questionType').value === 5) {
        this.possibleAnswersList.push({description: value.trim()});
      } else {
        this.possibleAnswersList.push(value.trim());
      }
      this.loadPossibleAnswer();
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  loadPossibleAnswer(): void {
    if (this.form.get('questionType').value === 5) {
      this.form.get('possibleAnswers').setValue(this.possibleAnswersList);
    } else {
      this.form.get('possibleAnswers').setValue(this.possibleAnswersList.toString());
    }
  }

  resolved(ev): void {
    this.form.get('captcha').setValue(ev);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  changeIcon(row: any): void {
    const dialogRef = this.dialog.open(DialogIconComponent, {
      height: '570px',
      width: '800px',
      panelClass: 'mat-dialog-without-padding',
      data: this.icon
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        row.icon = result;
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(true);
    this.unsubscribeAll.complete();
  }

}
