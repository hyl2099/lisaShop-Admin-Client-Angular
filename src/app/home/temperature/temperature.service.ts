import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService} from '../../core/http.service';
import {AppEndpoints} from '../../app-endpoints';
import {MatDialog} from '@angular/material/dialog';
import {Form} from '@angular/forms';
import {Temperature} from './temperature.model';

@Injectable()
export class TemperatureService {

  constructor(private dialog: MatDialog,private httpService: HttpService) {
  }

  readAll(): Observable<Temperature[]> {
    return this.httpService.get(AppEndpoints.TEMPERATURE_ALL);
  }

  delete(picture: Temperature): Observable<Temperature> {
    return this.httpService.delete(AppEndpoints.TEMPERATURE_DELETE  + '/' + picture.id);
  }
}
