/**
 * Created by Blow on 2017-07-06.
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { AboutService } from "../../providers/about.Service";
import { AbstractComponent } from "../../interfaces/abstract-component";
import { AppConfig } from '../../app/app.config';


@Component({
  selector: 'page-new-grade',
  templateUrl: 'new-grade.html',
})
export class NewGradePage extends AbstractComponent implements OnInit {
  grade:Array<any>;
	constructor(public navCtrl: NavController,
		public modalCtrl: ModalController,
		protected loadingCtrl: LoadingController,
		protected toastCtrl: ToastController,
		protected alertCtrl: AlertController,
		private aboutSvc:AboutService,
		protected cfg: AppConfig
	) {
		super(cfg, navCtrl, toastCtrl, loadingCtrl, null, alertCtrl);
	}
	ngOnInit() {
		this.aboutSvc.getNewGrade().subscribe(u => {
      this.grade = u;
			if(this.grade.length<=0){
				this.showMessage("一门成绩都没出","middle",3000);
				this.navCtrl.pop();
			}
		}, err => {
		  if(err.status === 401){
				this.showMessage(err.message);
				this.navCtrl.push('TokenValidate');
				return;
			}
			this.showMessage("出错了");
			this.navCtrl.pop();
			console.error(err);
		})
	}
}
