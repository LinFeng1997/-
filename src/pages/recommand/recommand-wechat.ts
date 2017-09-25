import { Component,OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppConfig } from '../../app/app.config';
import { AbstractComponent } from '../../interfaces/abstract-component';
@Component({
  selector: 'page-recommand-wechat',
  templateUrl: 'recommand-wechat.html'
})
export class RecommandWechatPage extends AbstractComponent implements OnInit {
  testValue: string = "";
  testDeletedValue: string = "";
  selfInformation: any;
  id: any;
  constructor(public navCtrl: NavController,
    protected cfg: AppConfig,
  ) {
    super(cfg,navCtrl);
  }
  ngOnInit() {

  }

}
