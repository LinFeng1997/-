/**
 * Created by Blow on 2017-03-30.
 */
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController, LoadingController, ToastController, ViewController } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { AbstractComponent } from "../../interfaces/abstract-component";
import { AppConfig } from '../../app/app.config';
import { InfoService } from '../../providers/info.Service';


@Component({
	selector: 'page-course-list',
	templateUrl: 'course-list.html'
})
export class CourseListPage extends AbstractComponent implements OnInit {
	courseList:any;
	tmpCourseList: any;
	constructor(public viewCtrl: ViewController, public navCtrl: NavController,
		public modalCtrl: ModalController,
		protected loadingCtrl: LoadingController,
		protected toastCtrl: ToastController,
		protected cfg: AppConfig,
		protected infoSvc: InfoService
	) {
		super(cfg, navCtrl, toastCtrl, loadingCtrl);
	}
	ngOnInit() {
		
		this.courseList = this.infoSvc.queryCourseList();
		this.tmpCourseList = this.courseList;

		
	}
	selectCourse(item) {
		this.viewCtrl.dismiss(item);
	}

	filterItems(ev) {
		this.courseList = this.tmpCourseList;
		let val = ev.target.value;
		if (val && val.trim() !== '') {
			this.courseList = this.courseList.filter((e) => {
				return e.includes(val);
			})

		}
	}
}
