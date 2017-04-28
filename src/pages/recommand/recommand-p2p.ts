import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController, ToastController, ViewController } from 'ionic-angular';
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
    protected cfg: AppConfig,
  ) {
    super(cfg, navCtrl, toastCtrl, loadingCtrl);
  }
  ngOnInit() {
    
  }

}
