/**
 * Created by Blow on 2017-04-16.
 */
import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, ToastController } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { AbstractComponent } from "../../interfaces/abstract-component";
import { AppConfig } from '../../app/app.config';
import { TeacherDetailsModel } from '../../entities/TeacherDetailsModel'
import { PieChartComponent } from '../../components/pie-chart/pie-chart';


@Component({
	selector: 'page-details',
	templateUrl: 'details.html'
})
export class DetailsPage extends AbstractComponent implements OnInit {
	
	teacherDetails: any;
	propArr: any = [];
	teacherModels: Array<TeacherDetailsModel> = [];

	constructor(public navCtrl: NavController,
		public navParams: NavParams,
		public modalCtrl: ModalController,
		protected loadingCtrl: LoadingController,
		protected toastCtrl: ToastController,
		protected cfg: AppConfig
	) {
		super(cfg, navCtrl, toastCtrl, loadingCtrl);
	}
	ngOnInit() {
		this.teacherDetails = this.navParams.get('teacher');
		this.loadTeacherDetails();
		
		// this.getDoughnutChart([this.teacherModels[0].badCount,this.teacherModels[0].commonCount,this.teacherModels[0].goodCount],0);
		console.log('细节页');
		console.log(this.teacherModels);
	}

	loadTeacherDetails() {
		for (let prop in this.teacherDetails[0]) {
			this.propArr.push(prop);
		}
		//放进教师细节的数据结构里去
		this.teacherDetails.forEach((e) => {
			let arr = [];
			for (let i = 0, len = this.propArr.length; i < len; i++) {
				arr.push(e[this.propArr[i]]);
			}
			let teacherModel = new TeacherDetailsModel(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6], arr[7]);
			this.teacherModels.push(teacherModel);
		});
	}


	toDetails(item):any{
		this.showModal(PieChartComponent,{teacher:item});
	}
}
