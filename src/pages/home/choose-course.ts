/**
 * Created by Blow on 2017-04-05.
 */
import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, ToastController, AlertController, PopoverController, Popover } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { AbstractComponent } from "../../interfaces/abstract-component";
import { AppConfig } from '../../app/app.config';
import { CourseModel } from '../../entities/CourseModel';
import { UserService } from "../../providers/user.Service";

@Component({
	selector: 'page-choose-course',
	templateUrl: 'choose-course.html'
})
export class ChooseCoursePage extends AbstractComponent implements OnInit {
	model: Array<CourseModel> = [];
	// 选课验证码地址
	validate: any;
	// 选课验证码
	validateCode: any;
	constructor(public navCtrl: NavController,
		public modalCtrl: ModalController,
		protected loadingCtrl: LoadingController,
		protected toastCtrl: ToastController,
		protected alertCtrl: AlertController,
		protected popCtrl: PopoverController,
		protected cfg: AppConfig,
		protected userSvc: UserService
	) {
		super(cfg, navCtrl, toastCtrl, loadingCtrl, null, alertCtrl);
	}
	ngOnInit() {
		this.model.push(new CourseModel("2017000001", false));
		console.log('Hello,选课');
	}

	getToChooseCourse() {
		// console.log(this.model);
		return this.model.filter(item => !item.done);
	}

	addItem(newItem) {
		if (newItem != "") {
			this.model.push(new CourseModel(newItem, false));
		}
	}

	getValidate(): any {
		this.userSvc.userChooseCourseValidate().subscribe((u) => {
			this.validate = u;
			// this.showPopover();
		},
			er => {
				this.showMessage('获取验证码失败');
				if (er.status === 401) {
					this.navCtrl.pop();
					this.showMessage('登录失效,请重新登录', 'middle');
				}
				console.log(er);
			})
	}

	chooseSingleCourse(): any {
		this.userSvc.userChooseCourse(this.model[0].courseNumber, this.validate).subscribe(u => {
			console.log(u);
		}, er => {
			this.showMessage('选课失败' + er.message);

			console.log(er);
		})
	}
}


