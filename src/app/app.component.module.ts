//组件声明文件
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
//教师和成绩教学班相关
import { AboutPage } from '../pages/about/about';
import { AboutListPage  } from '../pages/about/about-list';
import { DetailsPage  } from '../pages/about/details';
//测试页
import { ContactPage } from '../pages/contact/contact';
//个人页面
import { HomePage } from '../pages/home/home';
import { ChooseCoursePage } from '../pages/home/choose-course';

//推荐页面
import { RecommandPage} from '../pages/recommand/recommand';

import { LoginComponent } from '../components/login-one/login-one';
import { ChartsComponent } from '../components/charts/charts';
import { ItemListComponent } from '../components/item-list/item-list';
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
	HomePage,
	ChooseCoursePage,

	LoginComponent,
	ChartsComponent,
	ItemListComponent
	// EchartsComponent
]



