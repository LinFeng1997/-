/**
 * Created by Blow on 2017-03-30.
 */
import { Component, OnInit} from '@angular/core';
import { ModalController, LoadingController, ToastController, ViewController } from 'ionic-angular';
import { NavController, NavParams, InfiniteScroll } from 'ionic-angular';
import { AbstractComponent } from "../../interfaces/abstract-component";
import { AppConfig } from '../../app/app.config';


@Component({
	selector: 'page-about-list',
	templateUrl: 'about-list.html'
})
export class AboutListPage extends AbstractComponent implements OnInit {
	listType:string;
	constructor(public viewCtrl: ViewController, public navCtrl: NavController,
		public modalCtrl: ModalController,
		protected loadingCtrl: LoadingController,
		protected toastCtrl: ToastController,
		protected cfg: AppConfig,
		protected navParams:NavParams
	) {
		super(cfg, navCtrl, toastCtrl, loadingCtrl);
	}
	ngOnInit() {
		this.listType = this.navParams.get('listType');
	}
}
