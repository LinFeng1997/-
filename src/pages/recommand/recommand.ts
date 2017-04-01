/**
 * Created by Blow on 2017-03-31.
 */
import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, ToastController, ViewController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { AbstractComponent } from "../../interfaces/abstract-component";
import { AppConfig } from '../../app/app.config';
import { AbstractService } from "../../interfaces/abstract-service";

@Component({
	selector: 'page-recommand',
	templateUrl: 'recommand.html'
})
export class RecommandPage extends AbstractComponent implements OnInit {
	testValue: string = "";
	testDeletedValue: string = "";
	constructor(public viewCtrl: ViewController, public navCtrl: NavController,
		public modalCtrl: ModalController,
		protected loadingCtrl: LoadingController,
		protected toastCtrl: ToastController,
		protected cfg: AppConfig,
		private cacheService: AbstractService
	) {
		super(cfg, navCtrl, toastCtrl, loadingCtrl);
	}
	ngOnInit() {

	}
	// 根据不同情况增加缓存，课程那个可能是个数组，一直push啊push啊
	addToCache(value) {
		let cacheKey = this.cfg.cacheKeys.username;

		// 加入缓存,每次都会覆盖
		// 键值对系列(单值)
		this.cacheService.addCache(cacheKey,
			{
				username: value,
			});
		console.log("插入对象")

	}

	addToCache2(value) {
		let cacheKey = this.cfg.cacheKeys.password;
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

	getCache(key) {
		let cacheKey = key;
		try {
			this.cacheService.getCacheAsync(cacheKey)
				.then(v => {
					//获取到了一个对象，有id有值
					console.log(v);
					this.showMessage(v.user);
				})
				.catch(er => {
					console.log("错误");
				});
		} catch (e) {
			console.log(`成绩有毒的缓存${cacheKey}获取失败!`);
		}
	}
	// 传的是键不是值
	deleteCache(key) {
		this.cacheService.deleteCache(key);
	}

	clearCache(key) {
		this.cacheService.clearCache();
	}
}
