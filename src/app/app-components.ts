import {HomeComponent} from './home/home.component';
import {UsersComponent} from './home/users/users.component';
import {WelcomeComponent} from './welcome.component';
import {PicturesComponent} from './home/pictures/pictures.component';
import {UsersCreationDialogComponent} from './home/users/users-creation-dialog.component';
import {UsersDetailDialogComponent} from './home/users/users-detail-dialog.component';
import {TemperatureComponent} from './home/temperature/temperature.component';

export class AppComponents {
  static COMPONENTS = [
    HomeComponent,
    UsersComponent,
    WelcomeComponent,
    PicturesComponent,
    TemperatureComponent
  ];

  static DIALOGS = [
    UsersCreationDialogComponent,
    UsersDetailDialogComponent
  ];
}
