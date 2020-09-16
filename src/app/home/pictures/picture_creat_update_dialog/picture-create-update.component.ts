import {Component, Inject} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {DomSanitizer} from '@angular/platform-browser';
import {ListService} from './list.service';
import {HttpService} from '../../../core/http.service';
import {TokensService} from '../../../core/tokens.service';


@Component({
  templateUrl: './picture-create-update.component.html',
  styleUrls: ['./picture-create-update.component.css']
})
export class PictureCreateUpdateComponent {
  // **声明表单变量 */
  from:{
    owner:string,
    remark:string,
    photo:File,
    image:null,
    uploadTime:Date
  }
  // **设置的图片框默认显示一张图片*/
  imgSrc = '../../../assets/images/nuevo.png';
  date:string;
  file:any;
  formdate:FormData;
  nowTime: Date;
  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialog: MatDialog,
    private message: MatSnackBar,
    private tokensService: TokensService,
    private listservice:ListService,
    public _d: DomSanitizer
  ) {  }
  onSubmit(value):void{
    this.nowTime = new Date((new Date()).getTime() - (new Date()).getTimezoneOffset() * 60 * 1000);
    this.formdate=new FormData();
    this.formdate.append('owner',this.tokensService.getName());
    this.formdate.append('uploadTime',this.nowTime.toString());
    this.formdate.append('remark',value.remark);
    this.formdate.append('file',this.file);

    this.listservice.onSubmit(this.formdate).subscribe(
      // 执行成功以后通过路由进行组件跳转
      () => this.dialog.closeAll()
          , () => this.message.open('User created successfully', null, {
            duration: 2000,
          })
  );
  }
  // 上传文件的input框的监听事件
  fileChange(e) {
    this.file = e.srcElement.files[0]; // 获取图片这里只操作一张图片
    this.imgSrc = window.URL.createObjectURL(this.file); // 获取上传的图片临时路径
  }
}
