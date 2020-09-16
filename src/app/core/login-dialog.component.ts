import {Component, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {TokensService} from './tokens.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  templateUrl: 'login-dialog.component.html',
  styleUrls: ['dialog.component.css']
})
export class LoginDialogComponent {
  email: string;
  password: string;
  homeUrl: string;
  constructor(@Inject(MAT_DIALOG_DATA) data: any,
              private tokensService: TokensService, private router: Router) {
    this.homeUrl = data.homeUrl;
  }
  login() {
    this.tokensService.login(this.email, this.password).subscribe(
      () => {
        this.router.navigate([this.homeUrl]);
      }
    );
  }
}
