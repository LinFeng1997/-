/**
 * Created by Blow on 2017-03-30.
 */
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController, LoadingController, ToastController, ViewController } from 'ionic-angular';
import { NavController, NavParams,InfiniteScroll } from 'ionic-angular';
import { AbstractComponent } from "../../interfaces/abstract-component";
import { AppConfig } from '../../app/app.config';
import { InfoService } from '../../providers/info.Service';


@Component({
	selector: 'page-teacher-list',
	templateUrl: 'teacher-list.html'
})
export class TeacherListPage extends AbstractComponent implements OnInit {
	teacherList: any;
	tmpTeacherList: any;
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
		this.tmpTeacherList = this.infoSvc.queryTeacherList();
		//分治法
		this.teacherList = this.tmpTeacherList.slice(0, 20);
	}
	selectTeacher(item) {
		this.viewCtrl.dismiss(item);
	}

	filterItems(ev) {
		let val = ev.target.value;
		if (val && val.trim() !== '') {
			this.teacherList = this.tmpTeacherList.filter((e) => {
				return e.includes(val);
			})

		}
	}
	// 用户手动加载数据
	doInfinite(infiniteScroll: InfiniteScroll) {
		this.teacherList.push(this.tmpTeacherList.slice(this.count,this.count+1));
		infiniteScroll.complete();
		this.count++;
	}

}




