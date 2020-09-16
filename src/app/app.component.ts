import { Component } from '@angular/core';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  apiEndPoint: string;
  profile: string;
  title = 'SmartRoom-Angular';

  constructor() {
    this.apiEndPoint = environment.API;
    // this.profile = environment.production ? 'Prod' : 'Dev';
  }
}
