import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
//个人页面
import { HomePage } from './home';
import { LoginComponent } from './../../components/login-one/login-one';
import { NewGradePage } from './new-grade';


@NgModule({
  declarations: [
    HomePage,
    NewGradePage,
    LoginComponent
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    IonicPageModule.forChild(NewGradePage),
    IonicPageModule.forChild(LoginComponent),
  ],
  exports: [
    HomePage
  ]
})
export class HomeModule { }
