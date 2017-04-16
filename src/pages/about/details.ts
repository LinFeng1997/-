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
	//Todo:抽象成组件
	teacherDetails:any;
	propArr:any = [];
	constructor(public navCtrl: NavController,
		public navParams:NavParams,
		public modalCtrl: ModalController,
		protected loadingCtrl: LoadingController,
		protected toastCtrl: ToastController,
		protected cfg: AppConfig
	) {
		super(cfg, navCtrl, toastCtrl, loadingCtrl);
	}
	ngOnInit() {
		this.teacherDetails = this.navParams.get('teacher');
		for (var prop in this.teacherDetails[0]) {
			this.propArr.push(prop);
		}
		console.log(this.propArr);
		console.log('细节页');
	}
	ionViewDidLoad() {
		console.log('ionViewDidLoad DetailsPage');
	}

}
