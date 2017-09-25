import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AbstractComponent } from "../../interfaces/abstract-component";
import { AppConfig } from '../../app/app.config';
import { RecommandChat } from './recommand-chat';

import { SocketService } from "../../providers/datas/socket.Service";
import { AbstractService } from "../../interfaces/abstract-service";


@IonicPage()
@Component({
  selector: 'page-recommand-list',
  templateUrl: 'recommand-list.html',
})
export class RecommandList extends AbstractComponent implements OnInit {
  user: string;
  toUser: string;
  message: string;
  constructor(public navCtrl: NavController,
    protected cfg: AppConfig,
    protected alertCtrl: AlertController,
    protected toastCtrl: ToastController,
    private socket: SocketService,
    private cacheService: AbstractService
  ) {
    super(cfg, navCtrl, toastCtrl, null, null, alertCtrl);
  }
  ngOnInit() {
    this.user = this.cfg.config.id;
    // this.getSocket();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecommandList');
  }

  chat() {
    this.navCtrl.push(RecommandChat);
  }
  delete() {
    this.showMessage("人渣!");
  }

  chatTest() {
    //Todo:错误处理
    let msg = { toUser: this.toUser, fromUser: this.user, msg: this.message, time: Date.now() };
    // console.log(msg);
    this.socket.emit('sendMsg', msg);
    this.showMessage("发送完毕");

  }

}

