//组件声明文件
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
//教师和成绩教学班相关
import { AboutPage } from '../pages/about/about';
import { AboutListPage } from '../pages/about/about-list';
import { DetailsPage } from '../pages/about/details';
//测试页
import { ContactPage } from '../pages/contact/contact';
//个人页面
import { HomePage } from '../pages/home/home';
import { ChooseCoursePage } from '../pages/home/choose-course';

//推荐页面
import { RecommandPage } from '../pages/recommand/recommand';
import { RecommandWechatPage } from '../pages/recommand/recommand-wechat'
import { RecommandP2pPage } from '../pages/recommand/recommand-p2p'

import { LoginComponent } from '../components/login-one/login-one';
import { ChartsComponent } from '../components/charts/charts';
import { ItemListComponent } from '../components/item-list/item-list';
import { PieChartComponent } from '../components/pie-chart/pie-chart';
import { Game2048Component } from '../components/game-2048/game-2048';

// import { EchartsComponent } from '../components/echarts/echarts';


/**
 * 申明组
 * @type {(MyApp|HomePage|somePage|TabsPage|ErrorPage)[]}
 */
export const AppComponents: any = [
	MyApp,
	TabsPage,
	AboutPage,
	AboutListPage,
	DetailsPage,
	ContactPage,
	RecommandPage,
	RecommandWechatPage,
	RecommandP2pPage,
	HomePage,
	ChooseCoursePage,

	LoginComponent,
	ChartsComponent,
	ItemListComponent,
	PieChartComponent,
	Game2048Component,
	// EchartsComponent
]



