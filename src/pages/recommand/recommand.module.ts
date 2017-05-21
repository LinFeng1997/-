import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
//推荐页面
import { RecommandPage } from './recommand';
import { RecommandWechatPage } from './recommand-wechat';
import { RecommandP2pPage } from './recommand-p2p';
import { RecommandChat } from './recommand-chat';
import { RecommandList } from './recommand-list';
import { Game2048Component } from './../../components/game-2048/game-2048';


@NgModule({
  declarations: [
    RecommandPage,
    RecommandWechatPage,
    RecommandP2pPage,
    RecommandChat,
    RecommandList,
    Game2048Component
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
  ]
})
export class RecommandModule { }
