import {Component, Inject} from '@angular/core';
import {Picture} from '../pictures.model';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PicturesService} from '../pictures.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  templateUrl: 'pictures-detail-dialog.component.html'
})

export class PicturesDetailDialogComponent {
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

  // 已经不需要
  // 前台向后台发送请求，设置头部的responseType: 'arraybuffer'来接受图片的二进制流。
  // 2.后台读取对应的图片，然后以二进制流的形式返回给前台。
  // 3.前台用Blob来重新生成图片，并用URL.createObjectURL()来生成图片的url。

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private dialog: MatDialog,
              private dialogRef: MatDialogRef<PicturesDetailDialogComponent>,
              private message: MatSnackBar, private picturesService: PicturesService) {
    this.picturesService.searchById(data.id).subscribe(
      response => this.picture = response,
    );
  }
}
