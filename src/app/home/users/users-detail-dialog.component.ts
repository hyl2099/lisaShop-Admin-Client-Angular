import {Component, Inject} from '@angular/core';

import {UserService} from '../shared/users/user.service';
import {User} from '../shared/users/user.model';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  styleUrls: ['users-detail-dialog.component.css'],
  templateUrl: `users-detail-dialog.component.html`
})
export class UsersDetailDialogComponent {

  user: User = {
    mobile: null,
    username: null,
    email: null,
    active: null
  };

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
              private userService: UserService) {
    this.userService.read(data.mobile).subscribe(
      user => {
        this.user = user;
      }
    );
  }
}
