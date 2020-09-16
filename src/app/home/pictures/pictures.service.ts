import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Picture} from './pictures.model';
import {HttpService} from '../../core/http.service';
import {AppEndpoints} from '../../app-endpoints';
import {MatDialog} from '@angular/material/dialog';

@Injectable()
export class PicturesService {

  constructor(private dialog: MatDialog,private httpService: HttpService) {
  }

  readAll(): Observable<Picture[]> {
    return this.httpService.get(AppEndpoints.PICTURES);
  }

  // 根据owner获取图片全部信息
  // pictures/owner/4
  searchByOwner(owner: string): Observable<Picture[]> {
    return this.httpService.get(AppEndpoints.PICTURES_OWNER+ '/' + owner);
  }
  // 根据获取图片全部信息
  // pictures/id/4
  searchById(id: number): Observable<Picture> {
    // pictures/id/4
    return this.httpService.get(AppEndpoints.PICTURES_ID+ '/' + id);
  }

  // 不需要了。
  // 根据ID获取图片文件
  searchPhoto(id: number): Observable<Picture>{
    // 带参数用这个，相当于/picturesphoto?id=4
    // this.httpService.param('id', picture.id.toString());
    // 但后端没有参数，需要/picturesphoto/4
    // this.httpService.
    return this.httpService.get(AppEndpoints.PICTURES_PHOTO + '/' + id);
  }

  create(picture: Picture): Observable<Picture> {
    return this.httpService.post(AppEndpoints.PICTURES_SAVE, picture);
  }

  update(newPicture: any): Observable<Picture> {
    return this.httpService.patch(AppEndpoints.PICTURES_UPDATE + '/' + newPicture.id,newPicture);
  }

  delete(picture: Picture): Observable<Picture> {
    return this.httpService.delete(AppEndpoints.PICTURES_DELETE  + '/' + picture.id);
  }
}
