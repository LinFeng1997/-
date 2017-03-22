/**
 * Modify by Blow on 2017-03-30.
 */
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController, LoadingController, ToastController} from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { AbstractComponent } from "../../interfaces/abstract-component";
import { AppConfig } from '../../app/app.config';


@Component({
	selector: 'page-about',
	templateUrl: 'about.html'
})
export class AboutPage extends AbstractComponent implements OnInit{
	howSearch: string = '模糊搜索';
	constructor(public navCtrl: NavController,
		public modalCtrl: ModalController,
		protected loadingCtrl: LoadingController,
		protected toastCtrl: ToastController,
		protected cfg: AppConfig
	) {
		super(cfg, navCtrl, toastCtrl, loadingCtrl);
	}
	ngOnInit() {
		console.log('Hello');
	}
}
