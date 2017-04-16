/**
 * Created by Blow on 2017-04-16.
 */
import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, ToastController } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { AbstractComponent } from "../../interfaces/abstract-component";
import { AppConfig } from '../../app/app.config';
@Component({
	selector: 'page-details',
	templateUrl: 'details.html'
})
export class DetailsPage extends AbstractComponent implements OnInit {

	constructor(public navCtrl: NavController,
		public modalCtrl: ModalController,
		protected loadingCtrl: LoadingController,
		protected toastCtrl: ToastController,
		protected cfg: AppConfig
	) {
		super(cfg, navCtrl, toastCtrl, loadingCtrl);
	}
	ngOnInit() {
		console.log('细节页');
	}
	ionViewDidLoad() {
		console.log('ionViewDidLoad DetailsPage');
	}

}
