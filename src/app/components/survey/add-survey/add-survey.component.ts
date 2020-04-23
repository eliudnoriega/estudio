import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SurveyModel} from '../../../models/survey';
import {SURVEY_TYPES} from '../../../constants/aplication';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SurveyService} from '../../../services/survey.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-survey',
  templateUrl: './add-survey.component.html',
  styleUrls: ['./add-survey.component.scss']
})
export class AddSurveyComponent implements OnInit, OnDestroy {

  loading = false;
  surveyTypes: Array<any>;
  form: FormGroup;
  title = 'Agregar Encuesta';
  private readonly unsubscribeAll = new Subject<boolean>();

  constructor(
    public readonly dialogRef: MatDialogRef<SurveyModel>,
    @Inject(MAT_DIALOG_DATA) public data: SurveyModel,
    private readonly formBuilder: FormBuilder,
    private readonly surveyService: SurveyService,
    private readonly snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.surveyTypes = SURVEY_TYPES;
    this.initForm();
    this.surveyService.getSurveys();

    this.surveyService.currentSurvey
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(survey => {
        if (survey.key) {
          this.form = this.formBuilder.group({
            key: [survey.key],
            name: [survey.name],
            surveyType: [survey.surveyType],
            directedPublic: [survey.directedPublic],
            captcha: ['', Validators.required]
          });
          this.title = 'Actualizar Encuesta';
        }
      });
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      surveyType: ['', Validators.required],
      directedPublic: ['', Validators.required],
      captcha: ['', Validators.required],
    });
    this.form.reset();
    if (!this.data) {
      this.surveyService.changeSurvey(new SurveyModel());
    }
  }

  save(): void {
    const survey = this.form.value;
    this.loading = true;
    if (survey.key) {
      this.surveyService.updateSurvey(this.form.value);
      this.openSnackBar('Actualizado Exitosamente');
      this.loading = false;
    } else {
      this.surveyService.saveSurvey(this.form.value);
      this.openSnackBar('Guardado Exitosamente');
      this.loading = false;
    }
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  resolved(ev) {
    this.form.get('captcha').setValue(ev);
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(true);
    this.unsubscribeAll.complete();
  }

  openSnackBar(message: string,): void {
    this.snackBar.open(message, 'ok', {
      duration: 2000,
      verticalPosition: 'top'
    });
  }

}
