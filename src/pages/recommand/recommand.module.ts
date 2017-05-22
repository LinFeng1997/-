import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
//推荐页面
import { RecommandPage } from './recommand';
import { RecommandWechatPage } from './recommand-wechat';
import { RecommandP2pPage } from './recommand-p2p';
import { RecommandChat } from './recommand-chat';
import { RecommandList } from './recommand-list';
import { Game2048Component } from './../../components/game-2048/game-2048';
//游戏需要的存储/组件
import { Storage } from '@ionic/storage';
import { SwipeVertical } from './../../components/swipe-vertical/swipe-vertical';

@NgModule({
  declarations: [
    RecommandPage,
    RecommandWechatPage,
    RecommandP2pPage,
    RecommandChat,
    RecommandList,
    Game2048Component,SwipeVertical
  ],
  imports: [
    IonicPageModule.forChild(RecommandPage),
    IonicPageModule.forChild(RecommandWechatPage),
    IonicPageModule.forChild(RecommandP2pPage),
    IonicPageModule.forChild(RecommandChat),
    IonicPageModule.forChild(RecommandList),
    IonicPageModule.forChild(Game2048Component),
  ],
  exports: [
    RecommandPage
  ],
  providers: [{ provide: Storage, useFactory: provideStorage }]

})
export class RecommandModule { }
export function provideStorage() {
  // return new Storage(['sqlite', 'websql', 'indexeddb'], { name: '__2048game' })
  return new Storage(['sqlite', 'websql', 'indexeddb','localstorage'])
}