import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ToastController } from 'ionic-angular';
import { AbstractComponent } from "../../interfaces/abstract-component";
import { AppConfig } from '../../app/app.config';
import { RecommandChat} from './recommand-chat';

@IonicPage()
@Component({
  selector: 'page-recommand-list',
  templateUrl: 'recommand-list.html',
})
export class RecommandList extends AbstractComponent implements OnInit {

  constructor( public navCtrl: NavController,
    protected cfg: AppConfig,
    protected alertCtrl:AlertController,
    protected toastCtrl: ToastController
  ) {
    super(cfg, navCtrl,toastCtrl,null,null,alertCtrl);
  }
  ngOnInit() {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecommandList');
  }

  chat(){
  	this.navCtrl.push(RecommandChat);
  }
  delete(){
    this.showMessage("人渣!");
  }

}
