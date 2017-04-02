/**
 * Modify by Blow on 2017-03-30.
 */
import { Component, OnInit} from '@angular/core';
import { ModalController, LoadingController, ToastController } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { AbstractComponent } from "../../interfaces/abstract-component";
import { AppConfig } from '../../app/app.config';
import { AboutListPage } from '../about/about-list';
import { TeacherListPage } from '../about/teacher-list';



@Component({
	selector: 'page-about',
	templateUrl: 'about.html'
})
export class AboutPage extends AbstractComponent implements OnInit {
	howSearch: string = '模糊搜索';
	course: string = "";
	teacher: string = "";
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
	// 这里数据量太大，优化---先操作数据再操作dom
	searchItem(value): any {
		this.showLoading('正在加载数据，请稍后...', 0, false);
		let courseModal = this.modalCtrl.create(AboutListPage,{listType:value});
		courseModal.onDidDismiss((data: any) => {
			if (data === null || data === undefined) return;
			this.course = data;
		});
		courseModal.present();
		this.closeLoading();
	}
}
