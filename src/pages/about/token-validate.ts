import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, ToastController } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { AbstractComponent } from "../../interfaces/abstract-component";
import { AppConfig } from '../../app/app.config';

/*
  Generated class for the TokenValidate page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-token-validate',
  templateUrl: 'token-validate.html'
})
export class TokenValidatePage extends AbstractComponent implements OnInit { 
  code:string;

   constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    protected loadingCtrl: LoadingController,
    protected toastCtrl: ToastController,
    protected cfg: AppConfig,
  ) {
    super(cfg, navCtrl, toastCtrl, loadingCtrl);
  }
  ngOnInit() {
    console.log('Hello');
  }

  submitCode(){
  	this.cfg.config.code = this.code;
    console.log(this.cfg.config.code);
    this.showMessage('提交成功，请再次查询！');
    this.navCtrl.pop();
  }

}
