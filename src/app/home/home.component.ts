import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {HttpService} from '../core/http.service';
import {TokensService} from '../core/tokens.service';
import {AdminsService} from './admins.service';
import {UserService} from './shared/users/user.service';
import {SystemService} from './system.service';
import {Picture} from './pictures/pictures.model';
import {MatDialog} from '@angular/material/dialog';
import {PicturesService} from './pictures/pictures.service';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],

})
export class HomeComponent {
  backend: string;

  username: string;
  email: string;

  picture: Picture;

  constructor(private router: Router, private dialog: MatDialog, private httpService: HttpService,
              private pictureService: PicturesService,
              private tokensService: TokensService, private userService: UserService,
              private adminsService: AdminsService, private systemService: SystemService) {
    // systemService.readVersion().subscribe(
    //   appInfo => this.backend = appInfo.version + '(' + appInfo.profile + ')'
    // );
    this.username = tokensService.getName();
    this.email = tokensService.getEmail();
  }

  // deleteDb() {
  //   this.dialog.open(CancelYesDialogComponent).afterClosed().subscribe(
  //     result => {
  //       if (result) {
  //         this.adminsService.deleteDb();
  //       }
  //     });
  // }
  //
  // seedDb() {
  //   this.adminsService.seedDb();
  // }

  logout() {
    this.tokensService.logout();
  }


}
