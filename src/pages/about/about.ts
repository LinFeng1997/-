/**
 * Modify by Blow on 2017-03-30.
 */
import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, ToastController } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { AbstractComponent } from "../../interfaces/abstract-component";
import { AppConfig } from '../../app/app.config';
import { AboutListPage } from '../about/about-list';
import { DetailsPage } from '../about/details';
import { AboutService } from '../../providers/about.Service'




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
		protected cfg: AppConfig,
		protected aboutSvc: AboutService
	) {
		super(cfg, navCtrl, toastCtrl, loadingCtrl);
	}
	ngOnInit() {
		console.log('Hello');
	}
	// Info:这里数据量太大，优化---先操作数据再操作dom
	searchItem(value): any {
		this.showLoading('正在加载数据，请稍后...', 0, false);
		let courseModal = this.modalCtrl.create(AboutListPage, { listType: value });
		courseModal.onDidDismiss((data: any) => {
			if (data === null || data === undefined) return;
			if (value === '课程') {
				this.course = data;
			}
			else if (value === '老师') {
				this.teacher = data;
			}
			else {
				return;
			}
		});
		courseModal.present();
		this.closeLoading();
	}
	queryTeacher(teacher): any {
		if (!teacher) {
			this.showMessage("请输入教师姓名");
			return;
		}
		this.aboutSvc.queryTeacher(teacher).subscribe(u => {
			console.log(u);
			this.navCtrl.push(DetailsPage, { teacher: u });
		}, er => {
			if (er.status === 500) {
				this.showMessage("请检查你的输入");
				return;
			}
			this.showMessage("请检查你的网络是否有问题");
		}
		)
	}
	queryClass(course): any {
		if (!course) {
			this.showMessage("请输入课程名");
			return;
		}
		this.aboutSvc.queryCourse(course).subscribe(u => {
			this.navCtrl.push(DetailsPage, { teacher: u });
		}, er => {
			if (er.status === 500) {
				this.showMessage("请检查你的输入");
				return;
			}
			this.showMessage("请检查你的网络是否有问题");
		}
		)
	}
	queryDetalis(course, teacher): any {
		if (!teacher) {
			this.showMessage("请输入教师姓名");
			return;
		}
		if (!course) {
			this.showMessage("请输入课程名");
			return;
		}
		this.aboutSvc.queryTeacher(teacher).subscribe(u => {
			// console.log(u);
			u = u.filter(e => { return e['课程名称'] === course });
			if (u.length===0) {
				this.showMessage(`${teacher}老師不教${course}這門課`);
				return;
			}
			this.navCtrl.push(DetailsPage, { teacher: u });
		}, er => {
			if (er.status === 500) {
				this.showMessage("请检查你的输入");
				return;
			}
			this.showMessage("请检查你的网络是否有问题");
		}
		)
	}
}
