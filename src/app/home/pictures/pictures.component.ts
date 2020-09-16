import {Component, OnInit} from '@angular/core';
import {Picture} from './pictures.model';
import {PicturesService} from './pictures.service';
import {PictureCreateUpdateComponent} from './picture_creat_update_dialog/picture-create-update.component';
import {MatDialog} from '@angular/material/dialog';
import {PicturesDetailDialogComponent} from './picture_detail/pictures-detail-dialog.component';
import {HttpService} from '../../core/http.service';
import {PicturesDeleteDialogComponent} from './picture_delete/pictures-delete-dialog.component';
import {PicturesUpdateDialogComponent} from './picture_update/pictures-update-dialog.component';

@Component({
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.css']
})
export class PicturesComponent implements OnInit{
  // 用来获取搜索栏中输入的信息
  picture:Picture;
  // 用来获取backend传回的所有图片信息
  pictures: Picture[] =[];
  title = 'Pictures';
  constructor(private dialog: MatDialog, private picturesService: PicturesService,private httpService: HttpService) {
    this.pictures= null;
    this.picture={id:null,owner:'',uploadTime: null, path: '',photo: null,image:null,remark: ''};
  }

  // 初始化就读取所有的图片信息
  ngOnInit(): void {
    this.httpService.getPictures().subscribe(response=>{
      this.pictures = response;
    });
  }

  readAll(){
    this.httpService.getPictures().subscribe(response=>{
      this.pictures = response;
    });
  }

  search() {
    if (this.picture.owner === '' ) {
      this.readAll();
    } else {
      this.picturesService.searchByOwner(this.picture.owner).subscribe(response=>{
        this.pictures = response;
      });
    }
  }

  resetSearch() {
    this.picture = {id: null, owner: '', uploadTime: null, path: '', photo:null, image: null, remark:''};
  }

  create() {
    this.dialog.open(PictureCreateUpdateComponent, {
      data: {
        update:true
      }
    }).afterClosed().subscribe(result => {
        this.readAll();
    });
  }

  read(picture: Picture) {
    this.dialog.open(PicturesDetailDialogComponent,
      {
        // width: '400px',
        data: {
          id: picture.id
        }
      }
    );
  }

  update(picture: Picture) {
    // TODO
    this.dialog.open(PicturesUpdateDialogComponent,
      {
        // width: '400px',
        data: {
          id: picture.id
        }
      }
    ).afterClosed().subscribe(result => {
        this.readAll();
    });
  }

  delete(picture: Picture) {
    this.dialog.open(PicturesDeleteDialogComponent,
      {
        // width: '400px',
        data: {
          id: picture.id
        }
      }
    ).afterClosed().subscribe(result => {
        this.readAll();
    });
  }

}
