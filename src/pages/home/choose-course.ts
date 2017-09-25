/**
 * Created by Blow on 2017-04-05.
 */
import { Component, OnInit,ViewChild } from '@angular/core';
import { ModalController, LoadingController, ToastController, AlertController, PopoverController} from 'ionic-angular';
import { NavController,Content } from 'ionic-angular';
import { AbstractComponent } from "../../interfaces/abstract-component";
import { AppConfig } from '../../app/app.config';
import { CourseModel } from '../../entities/CourseModel';
import { UserService } from "../../providers/user.Service";
import { AbstractService } from "../../interfaces/abstract-service";
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';

// declare let cordova: any;

@Component({
	selector: 'page-choose-course',
	templateUrl: 'choose-course.html'
})
export class ChooseCoursePage extends AbstractComponent implements OnInit {
	model: Array<CourseModel> = [];
	// 选课验证码地址
	validate: any;
	// 选课验证码地址数组
	validateArr: any = [];
	// 选课验证码
	validateCode: any;
	validateCodeArr: any = ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""];
	// 课程代码
	courseId: string;
	//评估课程
	evaluationCourse:Array<any> = [];
	comment:string = "";
	evaluationShow:boolean = true;
	/**
     * 是否ios
     */
    isIos:boolean = false;
	@ViewChild(Content) content: Content;

	constructor(public navCtrl: NavController,
		public modalCtrl: ModalController,
		protected loadingCtrl: LoadingController,
		protected toastCtrl: ToastController,
		protected alertCtrl: AlertController,
		protected popCtrl: PopoverController,
		protected cfg: AppConfig,
		protected userSvc: UserService,
		private cacheService: AbstractService,
		public themeableBrowser: ThemeableBrowser

	) {
		super(cfg, navCtrl, toastCtrl, loadingCtrl, null, alertCtrl,null,null,null,null,themeableBrowser);
	}
	ngOnInit() {
		if (AppConfig.platform === "ios")
        this.isIos = true;
		this.getCache();
		this.getEvaluation();
		console.log('Hello,选课');
		this.model = this.getToChooseCourse();
		console.log(this.model);
		// this.validateCodeArr.map(e=>{return "..."});
		// console.log(this.validateCodeArr);
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
	}

	getValidate(course): any {
		this.courseId = course;
		this.userSvc.userChooseCourseValidate().subscribe((u) => {
			this.validate = u;
			console.log(this.content);
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
		this.content.scrollToBottom();

	}

	chooseSingleCourse(course): any {
		this.userSvc.userChooseCourse(course, this.validateCode).subscribe(u => {
			if (u.Result) {
				this.showMessage(u.Result);
			}
			this.getValidate(course);
			console.log(u);
		}, er => {
			this.showMessage('选课失败' + er.message);
			this.getValidate(course);
			console.log(er);
		})

	}
	chooseSingleCourse2(course,i): any {
		console.log(this.validateCodeArr);
		this.userSvc.userChooseCourse(course.courseNumber, this.validateCodeArr[i]).subscribe(u => {
			if (u.Result) {
				this.showMessage(u.Result);
			}
			this.getValidate2(i,course);
			console.log(u);
		}, er => {
			this.showMessage('选课失败' + er.message);
			this.getValidate2(i,course);
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

		// 加入缓存,每次都会覆盖
		// 键值对系列(单值)
		this.cacheService.addCache(cacheKey,
			{
				course: value,
			});
		console.log("插入对象")
		// // 数组系列(多值)
		// console.log("插入数组")
		// this.cacheService.getCacheAsync(cacheKey)
		// 	.then(v => {
		// 		v.push(value);
		// 		this.cacheService.addCache(cacheKey, v);
		// 	})
		// 	.catch(er => {
		// 		this.cacheService.addCache(cacheKey, [value]);
		// 	});

	}
	getCache(): any {
		let cacheKey = this.cfg.cacheKeys.courseItem;
		try {
			this.cacheService.getCacheAsync(cacheKey)
				.then(v => {
					if (v.course) {
						this.model = v.course;
					}
				})
				.catch(er => {
					this.showMessage("请清空缓存");
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
	getEvaluation(): any {
		this.userSvc.getEvaluation().subscribe(u => {
			console.log(u.EvaluationResultList);
			this.evaluationCourse = u.EvaluationResultList;
		}, er => {
			this.showMessage('失败' + er.message);
			if (er.status === 401) {
				this.navCtrl.pop();
				this.showMessage('登录失效,请重新登录', 'middle');
			}
			console.log(er);
		})
	}

	evaluation(teachClassId, comment): any {
		this.userSvc.userEvaluation(teachClassId, comment).subscribe(u => {
			if(u==true){
				this.showMessage(teachClassId+'评估成功' );
			}
			else{
				this.showMessage('评估失败' );
			}
			console.log(u);
		}, er => {
			this.showMessage('评估失败' + er.message);
			if (er.status === 401) {
				this.navCtrl.pop();
				this.showMessage('登录失效,请重新登录', 'middle');
			}
			console.log(er);
		})
	}

	fasterEvaluation(){
		if(this.comment.length<=0){
			this.showMessage("评论失败！请输入评论","middle");
		}
		else {
			this.evaluationCourse.forEach(e=>{
				this.evaluation(e.TeachClassId,this.comment);
			});
		}
	}

	evaluationIsShow(){
		this.evaluationShow = !this.evaluationShow;
	}
	//验证码服务器一次只接收一个，这样反而选不上
	chooseMutCourse(courseArr): any {
		this.showMessage("批量选课为实验性功能，请谨慎使用，若发现bug，请立即用电脑或者app选一门模式选课！");
		this.validate = null;
		this.showLoading("切换模式中,请稍候",3000);
		courseArr.forEach(course=>{	
			this.courseId = course;
			this.userSvc.userChooseCourseValidate().subscribe((u) => {
			this.validateArr.push(u);
			// this.showPopover();
		},
		er => {
			this.showMessage('获取验证码失败');
			console.log(er);
		})
		});
		this.content.scrollToBottom();
	}

	ionViewWillUnload(){
		this.model = this.model.filter(item => !item.done);
		this.addToCache(this.model);
		console.log(this.model);
	}

	getValidate2(i,course): any {
		this.courseId = course;
		this.userSvc.userChooseCourseValidate().subscribe((u) => {
			this.validateArr[i] = u;
		},
		er => {
			this.showMessage('获取验证码失败');
			console.log(er);
		})
	}
}


