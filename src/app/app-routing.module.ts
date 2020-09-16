import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PicturesComponent } from './home/pictures/pictures.component';
import {PictureCreateUpdateComponent} from './home/pictures/picture_creat_update_dialog/picture-create-update.component';
import {WelcomeComponent} from './welcome.component';
import {HomeComponent} from './home/home.component';
import {UsersComponent} from './home/users/users.component';
import {TemperatureComponent} from './home/temperature/temperature.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'welcome'},
  {path: 'welcome', component: WelcomeComponent},
  {
    path: 'home', component: HomeComponent,
    children: [
      {path: 'users', component: UsersComponent},
      {path: 'pictures', component: PicturesComponent},
      {path: 'pictures/update', component: PictureCreateUpdateComponent},
      {path: 'temperature', component: TemperatureComponent},
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
