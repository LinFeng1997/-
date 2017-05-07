import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController, ToastController, ViewController,AlertController } from 'ionic-angular';
import { NavController, NavParams, InfiniteScroll } from 'ionic-angular';
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
    protected alertCtrl:AlertController,
    protected cfg: AppConfig,
  ) {
    super(cfg, navCtrl, toastCtrl, loadingCtrl);
  }
  ngOnInit() {
    this.showRadio();
  }

  showRadio() {
    let alert = this.alertCtrl.create();
    alert.setTitle('请选择你的CP属性');

    alert.addInput({
      type: 'radio',
      label: '报学霸大腿',
      value: '学霸',
      checked: true
    });
      alert.addInput({
      type: 'radio',
      label: '寻找有缘人双修',
      value: '相似',
      checked: false
    });

    alert.addButton('取消');
    alert.addButton({
      text: '确认',
      handler: data => {
        this.showLoading('正在寻找你的CP',3000);
      }
    });
    alert.present();
  }

}
