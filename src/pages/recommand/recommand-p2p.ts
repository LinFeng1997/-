import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, ToastController, ViewController, AlertController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { AbstractComponent } from "../../interfaces/abstract-component";
import { AppConfig } from '../../app/app.config';
@Component({
  selector: 'page-recommand-p2p',
  templateUrl: 'recommand-p2p.html'
})
export class RecommandP2pPage extends AbstractComponent implements OnInit {
  // @Input() listType: string;

  constructor(public viewCtrl: ViewController, public navCtrl: NavController,
    public modalCtrl: ModalController,
    protected loadingCtrl: LoadingController,
    protected toastCtrl: ToastController,
    protected alertCtrl: AlertController,
    protected cfg: AppConfig,
  ) {
    super(cfg, navCtrl, toastCtrl, loadingCtrl);
  }
  ngOnInit() {
    this.showRadio('请选择你的CP属性', ['抱学霸大腿', '寻找有缘人双修'],
      data => {
        this.showLoading('正在寻找你的CP', 3000);
      });
  }
}
