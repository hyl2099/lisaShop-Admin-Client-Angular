import {PicturesService} from './home/pictures/pictures.service';
import {UserService} from './home/shared/users/user.service';
import {SystemService} from './home/system.service';
import {AdminsService} from './home/admins.service';
import {TemperatureService} from './home/temperature/temperature.service';

export class AppServices {
  public static SERVICES = [
    PicturesService,
    UserService,
    SystemService,
    AdminsService,
    TemperatureService,
    PicturesService
  ];
}
