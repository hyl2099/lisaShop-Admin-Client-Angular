import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders }    from '@angular/common/http';
import {AppEndpoints} from '../../../app-endpoints';
import {Picture} from '../pictures.model';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  file = new FormData();
  picture: Picture;
  constructor(public http:HttpClient) { }

  // 将我们的参数以及上传的文件提交给服务器
  onSubmit(formdate:any):Observable<{}>{
    // 专门写了个接口存储文件。
    const api = 'http://localhost:8080/pictures/addfile';
    // const api = AppEndpoints.PICTURES_ADD_FILE;
    // 我们知道post方法有三个参数(url, body, param)，切记，最后一个参数不要写，空着，angular会自动判断应该使用什么请求头，因为包含文件，规定特定的请求头的话可能会出错，所以索性不要规定
    return this.http.post(api,formdate);
  }
}
