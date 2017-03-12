import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController, LoadingController, ToastController, App } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { UserService } from "../../providers/user.Service";
import { UserInfor } from "../../Entities/UserInfor";
import { CourseData } from "../../Entities/CourseData";
// import { UrpInfo } from "../../Entities/UrpInfo";
import { AbstractComponent } from "../../interfaces/abstract-component";
import { AppConfig } from '../../app/app.config';
import Chart from 'chart.js';

declare let _: any;
@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage extends AbstractComponent implements OnInit {
	@ViewChild('pieCanvas') pieCanvas;

	loginState: boolean = false;
	// urp用户的信息
	info: UserInfor;
	// urp用户的token
	token: string;
	// 饼图
	pieChart: any;
	// 存放课程的
	courseData: Array<CourseData>;
	// 临时存放课程的，用于过滤
	tmpCourseData: Array<CourseData>;
	// 平均成绩
	avgGrade:number = 0;
	constructor(public navCtrl: NavController,
		public modalCtrl: ModalController,
		protected loadingCtrl: LoadingController,
		protected toastCtrl: ToastController,
		private userSvc: UserService,
		protected cfg: AppConfig
	) {
		super(cfg, navCtrl, toastCtrl, loadingCtrl);
	}
	ngOnInit() {
		this.userSvc.loadUserData().subscribe(
			u => {
				this.info = u[0];
			}
		);
		console.log('Hello');
	}

	loadUserInfo(event): void {
		this.loginState = true;
		this.token = event.access_token;
		this.info = JSON.parse(event.userData);
		// console.log(this.info);
		this.loadGrade(this.token);
	}

	loadGrade(token: string): void {
		this.userSvc.userUrpGrade(token).subscribe(
			(r: any) => {
				if (r == null) {
					this.showMessage('失败,服务器没传数据回来');
					return;
				}
				this.courseData = this.handleAjax(r);
				this.tmpCourseData = this.courseData;
				console.log(this.courseData);
				// 初始化饼图
				this.pieChart = this.getPieChart();

			},

			er => {
				this.showMessage('获取成绩失败');
			}
		)
	}

	filterItems(ev) {
		this.courseData = this.tmpCourseData;
		let val = ev.target.value;
		if (val && val.trim() !== '') {
			this.courseData = this.courseData.filter((e) => {
				return e.courseName.includes(val);
			}) 

		}
	}
	// 得到饼图
	getPieChart() {
		let data = {
			labels: ["90分以上","80分-90分", "70分-80分", "60分-70分","60分以下"],
			datasets: [
				{
					data: this.handleGrade(),
					backgroundColor: ["#FFCE56","#FF6384","#36A2EB","#261E47","#516E41"],
					hoverBackgroundColor: ["#FFCE56","#FF6384","#36A2EB","#261E47","#516E41"]
				}]
		};
		return this.getChart(this.pieCanvas.nativeElement, "pie", data);
	}
	getChart(context, chartType, data, options?) {
		return new Chart(context, {
			type: chartType,
			data: data,
			options: options
		});
	}
	// 处理数据函数
	handleAjax(grade): any {
		let cds = new Array<CourseData>();
		// 这是取出了所有的值
		// _.forEach(grade, (value, key) => {
		// 	//取出键值对
		// 	console.log("测试");
		// 	console.log(key);
		// 	_.forEach(grade[key],(e)=>{
		// 		console.log(e);
		// 	});
		// });
		_.forEach(grade.ResultDetailList, (value) => {
			let cd = new CourseData();
			cd.semesterId = value.SemesterId;
			cd.gpa = value.Gpa;
			cd.credit = value.Credit;
			cds.push(cd);
		});
		cds.forEach((e, index) => {
			e.courseName = grade.TeachClassList[index].CourseName;
			e.result = grade.ResultList[index].Result;
		});
		return cds;
	}
	handleGrade(): any {
		let excellent: number = 0, good: number = 0, common: number = 0, notBad: number = 0, bad: number = 0;
		_.forEach(this.courseData, (e) => {
			let temp = parseInt(e.result);
			this.avgGrade += temp;
			if (temp >= 90) {
				excellent++;
			}
			else if (temp < 90 && temp >= 80) {
				good++;
			}
			else if (temp < 80 && temp >= 70) {
				common++;
			}
			else if (temp < 70 && temp >= 60) {
				notBad++;
			}
			else if (temp < 60 && temp >= 0) {
				bad++;
			}
			//万一遇到有毒的成绩怎么办?健壮?容错?
			else {
				this.showMessage('你的成绩有毒');
				console.log(temp);
			}
		});
		this.avgGrade = +((this.avgGrade/this.courseData.length).toFixed(2));

		// console.log(this.avgGrade);
		return [excellent, good, common, notBad, bad];
	}
}


