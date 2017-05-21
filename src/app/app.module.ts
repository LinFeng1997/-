//Info:此处为了兼容新版本修改了两处：引入Bro模块和修改Storage传参
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
import { RecommandModule} from './../pages/recommand/recommand.module';
import { AboutModule} from './../pages/about/about.module';
import { HomeModule} from './../pages/home/home.module';

// deeplink
import { ActionLinks } from './app.routes.module';



//自定义指令,以后多了是要抽象的
import { CounterDirective } from '../directives/counter.directive';

//游戏需要的存储/组件
import { Storage } from '@ionic/storage';
import { SwipeVertical } from '../components/swipe-vertical/swipe-vertical';

import './rxjs.extensions';


@NgModule({
  declarations: [ AppComponents,CounterDirective,SwipeVertical ],
  imports: [ IonicModule.forRoot(MyApp, AppConfig.ionicConfig, { links:ActionLinks }), CoreModule,RecommandModule,AboutModule,HomeModule],
  bootstrap: [IonicApp],
  entryComponents: [ AppComponents ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},{ provide: Storage, useFactory: provideStorage }]
})
export class AppModule {}

export function provideStorage() {
  // return new Storage(['sqlite', 'websql', 'indexeddb'], { name: '__2048game' })
  return new Storage(['sqlite', 'websql', 'indexeddb','localstorage'])
}