import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface ConfirmationDialogData {
  title: string;
  question: string;
}

@Component({
  selector: 'app-confirmation-dialog',
  template: `
      <h1 mat-dialog-title style="color:black">{{data.title}}</h1>
      <div mat-dialog-content>
          <p style="color:black">{{data.question}}</p>
      </div>
      <div mat-dialog-actions>
          <button mat-button (click)="onNoClick()" cdkFocusInitial>No</button>
          <button mat-button [mat-dialog-close]="true">Si</button>
      </div>
  `
})
export class ConfirmationDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  ngOnInit(): void {
    console.log(this.data);
  }
}
