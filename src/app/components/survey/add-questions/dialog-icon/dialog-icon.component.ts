import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {ICONS} from '../../../../constants/icon';

@Component({
  selector: 'app-dialog-icon',
  templateUrl: './dialog-icon.component.html',
  styleUrls: ['./dialog-icon.component.scss']
})
export class DialogIconComponent implements OnInit {

  title = 'Agregar Iconos';
  loading = false;
  iconSelected = 'add';
  iconArray: Array<string> = [];
  isShowLoaderIcons = false;
  dynamicHeight = {};
  searchIconInput = '';

  constructor(
    public readonly dialogRef: MatDialogRef<string>,
  ) {
  }

  save(): void {
    this.dialogRef.close(this.iconSelected);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  getAllIcons(): void {
    if (this.searchIconInput.length > 0) {
      this.iconArray = ICONS.filter(r => r.toLowerCase().startsWith(this.searchIconInput.toLowerCase()));
    } else {
      this.iconArray = ICONS;
    }
  }

  ngOnInit(): void {
    this.isShowLoaderIcons = true;
    this.iconArray = ICONS;
    setTimeout(() => {
      this.isShowLoaderIcons = false;
    }, 300);
  }

}
