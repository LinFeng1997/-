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
	selector: 'page-teacher-list',
	templateUrl: 'teacher-list.html'
})
export class TeacherListPage extends AbstractComponent implements OnInit {
	teacherList: any;
	tmpTeacherList: any;
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
		this.teacherList = this.infoSvc.queryTeacherList();
		this.tmpTeacherList = this.teacherList;
		// console.log(Array.isArray(this.tmpTeacherList))
		// console.log(this.teacherList)

	}
	selectTeacher(item) {
		this.viewCtrl.dismiss(item);
	}

	filterItems(ev) {
		this.teacherList = this.tmpTeacherList;
		let val = ev.target.value;
		if (val && val.trim() !== '') {
			this.teacherList = this.teacherList.filter((e) => {
				return e.includes(val);
			})

		}
	}

}




