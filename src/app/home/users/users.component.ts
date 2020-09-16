import {Component} from '@angular/core';

import {UserService} from '../shared/users/user.service';
import {User} from '../shared/users/user.model';
import {UsersCreationDialogComponent} from './users-creation-dialog.component';
import {UsersDetailDialogComponent} from './users-detail-dialog.component';
import {CancelYesDialogComponent} from '../../core/cancel-yes-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  templateUrl: 'users.component.html'
})
export class UsersComponent {

  user: User;

  title = 'Users management';
  columns = ['email', 'username'];
  data: User[];

  constructor(private dialog: MatDialog, private userService: UserService, private message: MatSnackBar) {
    this.user = {email: null, username: null};
    this.data = null;
  }

  search() {
    if (this.user.email == null && this.user.username == null ) {
      this.userService.readAll().subscribe(
        data => this.data = data
      );
    } else {
      this.userService.search(this.user.email, this.user.username).subscribe(
        data => {
            this.data = [];
            data.forEach(user => {
                this.data.push(user);
            });
            if (this.data.length === 0) {
              this.message.open('Users not found', null, {
                duration: 2500,
              });
            }
        }
      );
    }
  }

  resetSearch() {
    this.user = {email: null, username: null};
  }

  create() {
    this.dialog.open(UsersCreationDialogComponent, {
      data: {
        update: false
      }
    }).afterClosed().subscribe(
      () => this.search()
    );
  }

  read(user: User) {
    this.dialog.open(UsersDetailDialogComponent, {
      data: {
        email: user.email
      }
    });
  }

  update(user: User) {
    this.dialog.open(UsersCreationDialogComponent, {
      data: {
        email: user.email,
        update: true
      }
    }).afterClosed().subscribe(
      () => this.search()
    );
  }

  delete(user: User) {
    this.dialog.open(CancelYesDialogComponent).afterClosed().subscribe(
      result => {
        if (result) {
          user.active = false;
          this.userService.update(user.email, user).subscribe(
            () => this.search()
            , () => this.message.open('Ups, something bad happened', null, {
              duration: 2000,
            })
            , () => this.message.open('User disabled successfully', null, {
              duration: 2000,
            })
          );
        }
      }
    );
  }
}
