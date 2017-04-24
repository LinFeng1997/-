/**
 * Created by Blow on 2017-03-06.
 */
import { Component, OnInit,ViewChild } from '@angular/core';
import { ModalController, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { UserService } from "../../providers/user.Service";
import { UserInfor } from "../../entities/UserInfor";
import { CourseData } from "../../entities/CourseData";
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
	avgGrade: number = 0;
	// 公共平均分
	gAvg: number = 0;
	// 专业平均分
	zAvg: number = 0;
	// 加权平均分
	jAvg: number = 0;
	constructor(public navCtrl: NavController,
		public modalCtrl: ModalController,
		protected loadingCtrl: LoadingController,
		protected toastCtrl: ToastController,
		protected alertCtrl: AlertController,
		private userSvc: UserService,
		protected cfg: AppConfig
	) {
		super(cfg, navCtrl, toastCtrl, loadingCtrl, null, alertCtrl);
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

	loginOut(): void {
		//
		this.confirm('确认信息', '是否确定退出登录？',
			agree => {
				if (agree) {
					this.loginState = false;
					this.showMessage("退出登录");
				}
			}
		);

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
				this.calEveryAvg(this.courseData);
				// console.log(this.courseData);
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
		this.showLoading("加载中...");
		let data = {
			labels: ["90分以上", "80分-90分", "70分-80分", "60分-70分", "60分以下"],
			datasets: [
				{
					data: this.handleGrade(),
					backgroundColor: ["#FFCE56", "#FF6384", "#36A2EB", "#2ED244", "#000"],
					hoverBackgroundColor: ["#FFCE56", "#FF6384", "#36A2EB", "#2ED244", "#000"]
				}]
		};
		this.closeLoading();
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
			cd.semesterId = value.SemesterId.replace(/(\d{4})[\d]/gi,
				(match) => {
					if (match.substring(4) == 1)
						return match.substring(0, 4) + "秋季学";
					else if (match.substring(4) == 2)
						return match.substring(0, 4) + "春季学";
					else return match;
				}
			);;
			cd.gpa = value.Gpa;
			cd.credit = value.Credit;
			cds.push(cd);
		});
		cds.forEach((e, index) => {
			e.courseNature = grade.TeachClassList[index].CourseNature;
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
		this.avgGrade = +((this.avgGrade / this.courseData.length).toFixed(2));

		// console.log(this.avgGrade);
		return [excellent, good, common, notBad, bad];
	}

	calEveryAvg(o): any {
		let g = 0, z = 0 , j = 0;
		console.log(o);
		_.forEach(o, (value) => {
			this.jAvg += parseInt(value.result)*parseInt(value.credit);
			j+=parseInt(value.credit);
			switch (value.courseNature) {
				case "学科基础":
				case "专业必修":
				case "专业选修":
					this.zAvg += parseInt(value.result);
					z++;
					break;
				case "素质选修":
				case "公共必修":
					this.gAvg += parseInt(value.result);
					g++;
					break;
				default:
					// code...
					break;
			}
		});
		this.zAvg = +(this.zAvg / z).toFixed(2);
		this.gAvg = +(this.gAvg / g).toFixed(2);
		this.jAvg = +(this.jAvg / j).toFixed(2);
		// console.log(this.jAvg);
	}

	goToChooseCourse(){
		this.navCtrl.push('ChooseCourse');
	}

}



