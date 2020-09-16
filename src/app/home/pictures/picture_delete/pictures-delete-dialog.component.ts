import {Component, Inject} from '@angular/core';
import {Picture} from '../pictures.model';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PicturesService} from '../pictures.service';

@Component({
  templateUrl: 'pictures-delete-dialog.component.html'
})

export class PicturesDeleteDialogComponent {
  picture: Picture = {
    id:null,
    owner: null,
    uploadTime: null,
    path: null,
    photo: null,
    image:null,
    remark:null
  };
  color = 'warn';
  constructor(@Inject(MAT_DIALOG_DATA) data: any, private dialog: MatDialog,
              private dialogRef: MatDialogRef<PicturesDeleteDialogComponent>,
              private message: MatSnackBar, private picturesService: PicturesService) {
    this.picturesService.searchById(data.id).subscribe(
      response => this.picture = response,
    );
  }

  delete() {
    this.picturesService.delete(this.picture).subscribe(
      () => this.dialog.closeAll()
      , () => this.message.open('Something wrong', null, {
        duration: 2000,
      })
      , () => this.message.open('Deleted successfully!', null, {
        duration: 2000,
      })
    );
  }
}
