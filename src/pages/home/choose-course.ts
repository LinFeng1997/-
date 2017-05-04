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
import { AbstractService } from "../../interfaces/abstract-service";

// declare let cordova: any;

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
	// 课程代码
	courseId: string;
	constructor(public navCtrl: NavController,
		public modalCtrl: ModalController,
		protected loadingCtrl: LoadingController,
		protected toastCtrl: ToastController,
		protected alertCtrl: AlertController,
		protected popCtrl: PopoverController,
		protected cfg: AppConfig,
		protected userSvc: UserService,
		private cacheService: AbstractService

	) {
		super(cfg, navCtrl, toastCtrl, loadingCtrl, null, alertCtrl);
	}
	ngOnInit() {
		this.getCache();

		console.log('Hello,选课');
		this.getToChooseCourse();
	}

	getToChooseCourse() {
		// console.log(this.model);
		try {
			return this.model.filter(item => !item.done);

		} catch (e) {
			return null;
		}
	}

	addItem(newItem) {
		let reg = /^201\d[1-2][0-9A-Z]\d{4}$/g;
		if (!reg.test(newItem)) {
			this.showMessage("请输入正确的教学班代码格式~");
			return;
		}
		if (newItem != "") {
			var courseItem = new CourseModel(newItem, false);
			this.model.push(courseItem);
		}
		this.addToCache(courseItem);
		// console.log(this.getCache(this.cfg.cacheKeys.courseItem));
		// console.log(this.model);
	}

	getValidate(course): any {
		this.courseId = course;
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

	chooseSingleCourse(course): any {

		this.userSvc.userChooseCourse(course, this.validate).subscribe(u => {
			if (u.Result) {
				this.showMessage(u.Result);
			}
			console.log(u);
		}, er => {
			this.showMessage('选课失败' + er.message);

			console.log(er);
		})
	}

	chooseCourse(){
		this.showAlert("非VIP会员无法享受此功能","此功能暂不开放");
	}
	openChooseCourse():any{
		this.openExternalUrl("查看课程",'http://202.203.209.96/v5/#/teachClassOverview');
	}
	addToCache(value) {
		let cacheKey = this.cfg.cacheKeys.courseItem;
		// 数组系列(多值)
		console.log("插入数组")
		this.cacheService.getCacheAsync(cacheKey)
			.then(v => {
				v.push(value);
				this.cacheService.addCache(cacheKey, v);
				// 还是带id的
				// console.log(v._id);
			})
			.catch(er => {
				this.cacheService.addCache(cacheKey, [value]);
			});

	}
	getCache(): any {
		let cacheKey = this.cfg.cacheKeys.courseItem;
		try {
			this.cacheService.getCacheAsync(cacheKey)
				.then(v => {
					if (v) {
						this.model = v;
					}
				})
				.catch(er => {
					console.log("错误");
				});
		} catch (e) {
			console.log(`成绩有毒的缓存${cacheKey}获取失败!`);
		}
	}
	clearCourseItem() {
		this.confirm('确认信息', '是否确定清空你的选课篮？',
			agree => {
				if (agree) {
					this.cacheService.deleteCache(this.cfg.cacheKeys.courseItem);
					this.model = null;
					this.validate = null;	
					this.showMessage("清空完毕");
				}
			}
		);

	}
}


