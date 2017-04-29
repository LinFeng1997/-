//组件入口文件
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, IonicApp, ToastController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { AppVersion } from '@ionic-native/app-version';
import { Device } from '@ionic-native/device';

import { TabsPage } from '../pages/tabs/tabs';

import { AppConfig } from './app.config';
import { AbstractService } from "../interfaces/abstract-service";
import { AbstractComponent } from '../interfaces/abstract-component';

@Component({
  templateUrl: 'app.html'
})
export class MyApp extends AbstractComponent {
  rootPage = TabsPage;
  backButtonPressed: boolean = false;  //用于判断返回键是否触发
  @ViewChild('myNav') nav: Nav;

  constructor(public ionicApp: IonicApp, public toastCtrl: ToastController, private platform: Platform, protected cfg: AppConfig, protected appVersion: AppVersion, protected device: Device,
    private cacheService: AbstractService) {
    //
    super(cfg, null, null, null, null);
    //
    // AppConfig.BeingTime = moment();

    platform.ready()
      .then(() => {
        Splashscreen.hide();
        this.registerBackButtonAction();//注册返回按键事件
        //保存平台名称
        if (platform.is('android'))
          AppConfig.platform = 'android';
        else if (platform.is('ios'))
          AppConfig.platform = 'ios';
        else
          AppConfig.platform = 'Browser';

        //存储设备配置信息
        // this.storeConfigInfo();

        if (AppConfig.debug)
          console.log(`${this.cfg.config.logTAG}Device Ready`);
      });


  }


  /**
     * 获取当前用户
     */
  private getMyIdentity(cacheKey): void {
    // var cacheKey = this.cfg.cacheKeys.user;

    try {

      //
      this.cacheService.getCacheAsync(cacheKey)
        .then(
        v => {
          //Todo:保存点什么好呢？
        }
        )
        .catch(
        er => {

        }
        );
    }
    catch (err) {
      console.log(`TicketPassenger: cache key:${cacheKey} get fail: ${err.message}`);
    }
  }

  registerBackButtonAction() {
    this.platform.registerBackButtonAction(() => {
      //如果想点击返回按钮隐藏toast或loading或Overlay就把下面加上
      // this.ionicApp._toastPortal.getActive() || this.ionicApp._loadingPortal.getActive() || this.ionicApp._overlayPortal.getActive()
      let activePortal = this.ionicApp._modalPortal.getActive();
      if (activePortal) {
        activePortal.dismiss().catch(() => { });
        activePortal.onDidDismiss(() => { });
        return;
      }
      let activeVC = this.nav.getActive();
      let tabs = activeVC.instance.tabs;
      let activeNav = tabs.getSelected();
      return activeNav.canGoBack() ? activeNav.pop() : this.showExit()
    }, 1);
  }

  //双击退出提示框
  showExit() {
    if (this.backButtonPressed) { //当触发标志为true时，即2秒内双击返回按键则退出APP
      this.platform.exitApp();
    } else {
      this.toastCtrl.create({
        message: '再按一次退出成绩有毒',
        duration: 2000,
        position: 'middle'
      }).present();
      this.backButtonPressed = true;
      setTimeout(() => this.backButtonPressed = false, 2000);//2秒内没有再次点击返回则将触发标志标记为false
    }
  }
}
