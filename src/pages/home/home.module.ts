import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
//个人页面
import { HomePage } from './home';
import { LoginComponent } from './../../components/login-one/login-one';

@NgModule({
  declarations: [
    HomePage,
    LoginComponent
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    IonicPageModule.forChild(LoginComponent),
  ],
  exports: [
    HomePage
  ]
})
export class HomeModule { }
