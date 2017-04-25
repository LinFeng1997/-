//模块加载文件
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
// 基本配置文件
import { AppConfig } from './app.config';
// 核心模块
import { CoreModule } from './app.core.module';
// 组件
import { AppComponents } from './app.component.module';
// deeplink
import { ActionLinks } from './app.routes.module';

//自定义指令,以后多了是要抽象的
import { CounterDirective } from '../directives/counter.directive';

import './rxjs.extensions';


@NgModule({
  declarations: [ AppComponents,CounterDirective ],
  imports: [ IonicModule.forRoot(MyApp, AppConfig.ionicConfig, { links:ActionLinks }), CoreModule ],
  bootstrap: [IonicApp],
  entryComponents: [ AppComponents ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}