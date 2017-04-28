import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-recommand-wechat',
  templateUrl: 'recommand-wechat.html'
})
export class RecommandWechatPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecommandWechatPage');
  }

}
