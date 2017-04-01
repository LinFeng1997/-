/**
 * Modify by Blow on 2017-03-30.
 */
import { Component, OnInit} from '@angular/core';
import { ModalController, LoadingController, ToastController } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { AbstractComponent } from "../../interfaces/abstract-component";
import { AppConfig } from '../../app/app.config';
import { CourseListPage } from '../about/course-list';
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
	// 这里数据量太大，还需要优化,用户下拉刷新?
	searchCourse(): any {
		this.showLoading('正在加载数据，请稍后...', 0, false);
		let courseModal = this.modalCtrl.create(CourseListPage);
		courseModal.onDidDismiss((data: any) => {
			if (data === null || data === undefined) return;
			this.course = data;
		});
		courseModal.present();
		this.closeLoading();
	}
	searchTeacher(): any {
		this.showLoading('正在加载数据，请稍后...', 0, true);
		let teacherModal = this.modalCtrl.create(TeacherListPage);
		teacherModal.onDidDismiss((data: any) => {
			if (data === null || data === undefined) return;
			this.teacher = data;
		});
		teacherModal.present();
		this.closeLoading();
	}
}
