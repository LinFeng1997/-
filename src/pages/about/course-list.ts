/**
 * Created by Blow on 2017-03-30.
 */
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController, LoadingController, ToastController, ViewController } from 'ionic-angular';
import { NavController, NavParams, InfiniteScroll } from 'ionic-angular';
import { AbstractComponent } from "../../interfaces/abstract-component";
import { AppConfig } from '../../app/app.config';
import { InfoService } from '../../providers/info.Service';


@Component({
	selector: 'page-course-list',
	templateUrl: 'course-list.html'
})
export class CourseListPage extends AbstractComponent implements OnInit {
	courseList: any;
	tmpCourseList: any;
	// 用户每次手动加载的数量
	count:any = 20;
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
		this.tmpCourseList = this.infoSvc.queryCourseList();
		//分治法
		this.courseList = this.tmpCourseList.slice(0, 20);
	}
	selectCourse(item) {
		this.viewCtrl.dismiss(item);
	}

	filterItems(ev) {
		let val = ev.target.value;
		if (val && val.trim() !== '') {
			this.courseList = this.tmpCourseList.filter((e) => {
				return e.includes(val);
			})

		}
	}
	// 用户手动加载数据
	doInfinite(infiniteScroll: InfiniteScroll) {
		this.courseList.push(this.tmpCourseList.slice(this.count,this.count+1));
		// this.courseList = this.tmpCourseList;
		infiniteScroll.complete();
		this.count++;
		// this.infoSvc.getAsyncCourseData().then((newData) => {
		// this.courseList = this.tmpCourseList;
		// infiniteScroll.complete();
		// 	// if (this.items.length > 90) {
		// 	// 	infiniteScroll.enable(false);
		// 	// }
		// });
	}
}
