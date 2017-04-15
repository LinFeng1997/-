//组件入口文件
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
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

  constructor(private platform: Platform, protected cfg: AppConfig, protected appVersion: AppVersion, protected device: Device,
    private cacheService: AbstractService) {
    //
    super(cfg, null, null, null, null);
    //
    // AppConfig.BeingTime = moment();

    platform.ready()
      .then(() => {
        Splashscreen.hide();
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
}
