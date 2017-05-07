/**
 * Created by Blow on 2017-03-31.
 */
import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, ToastController, ViewController,AlertController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { AbstractComponent } from "../../interfaces/abstract-component";
import { AppConfig } from '../../app/app.config';
import { AbstractService } from "../../interfaces/abstract-service";
import { InfoService } from "../../providers/info.Service";
import { Game2048Component } from "../../components/game-2048/game-2048";
import { RecommandWechatPage } from '../../pages/recommand/recommand-wechat'

declare let window: any;
@Component({
	selector: 'page-recommand',
	templateUrl: 'recommand.html'
})
export class RecommandPage extends AbstractComponent implements OnInit {
	testValue: string = "";
	testDeletedValue: string = "";
	selfInformation: any;
	constructor(public viewCtrl: ViewController, public navCtrl: NavController,
		public modalCtrl: ModalController,
		protected loadingCtrl: LoadingController,
		protected toastCtrl: ToastController,
		protected alertCtrl:AlertController,
		protected cfg: AppConfig,
		private infoSvc: InfoService,
		private cacheService: AbstractService
	) {
		super(cfg, navCtrl, toastCtrl, loadingCtrl,null,alertCtrl);
	}
	ngOnInit() {
		//查询当前用户
		this.infoSvc.loadUserInfo()
			.subscribe(
			us => {
				this.selfInformation = us;
				//
				// if (AppConfig.debug)
				//     console.log(this.selfInformation);

				// if (AppConfig.currentUser != null && AppConfig.currentUser.isLogined) {
				//     this.selfInformation.name = AppConfig.currentUser.name;
				//     this.selfInformation.icon = AppConfig.currentUser.icon;
				// }
			}
			)
	}

	// 通知提示，Alert组件抽象出了问题
	showNotice(): void {
		// this.showLoading("<h1>lihai</h1>");
		// this.closeLoading();
		this.showAlert("给程序员哥哥打赏点钱吧~","开发中");
	}

	selectImg() {
		this.showMessage("开发中");
	}
	chooseCourse(){
		this.navCtrl.push("ChooseCourse");
	}
	doRefresh(event){
		this.infoSvc.loadUserInfo()
			.subscribe(
			us => {
				this.selfInformation = us;
			}
			)
		event.complete();
	}

	recommandWechat(){
		this.showModal(RecommandWechatPage);
	}
	//卖舍友
	msy(){
		this.openExternalUrl("卖舍友",'http://cn.mikecrm.com/8rWAzIS');
	}
	p2p(){
		//Todo:用户验证
		this.navCtrl.push("RecommandP2p");
	}
	playGame2048(){
		this.showModal(Game2048Component);
	}
	// 根据不同情况增加缓存，课程那个可能是个数组，一直push啊push啊
	addToCache(value) {
		let cacheKey = this.cfg.cacheKeys.user;

		// 加入缓存,每次都会覆盖
		// 键值对系列(单值)
		this.cacheService.addCache(cacheKey,
			{
				user: value,
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

	clearCache() {
		this.confirm('确认信息', '是否确定清空所有缓存？',
			agree => {
				if (agree) {
					this.cacheService.clearCache();
					this.showMessage("缓存已清空，重新启动APP生效~");
				}
			}
		);
	}

	simpleAjax() {
		//创建异步对象
		let xhr = this.ajax();
		xhr.onreadystatechange = function() {
			//可以通信
			if (xhr.onreadystatechange == 4 && xhr.status == 200) {
				this.setContainer('Original Ajax:' + xhr.responseText);
			}
		}
		xhr.open('get', 'https://www.baidu.com', true);
		console.log(xhr);
		//设置请求头
		// xhr.setRequestHeader();
		xhr.send();
	}

	ajax() {
		//初始化异步对象
		let xhr = null;
		try {
			xhr = new XMLHttpRequest();
		}
		//处理初始化异常
		catch (e) {
			// IE
			console.log('IE内核');
			// try {
			// 	xhr = new ActiveXObject("Msxml2.XMLHTTP");
			// } catch (e) {
			// 	try {
			// 		xhr = new ActiveXObject("Microsoft.XMLHTTP");
			// 	} catch (e) {
			// 		xhr = null;
			// 	}
			// }
		}
		return xhr;
	}


}
