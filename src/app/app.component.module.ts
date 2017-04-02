import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';

import { AboutPage } from '../pages/about/about';
import { AboutListPage  } from '../pages/about/about-list';

import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
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
	ContactPage,
	RecommandPage,
	HomePage,
	LoginComponent,
	ChartsComponent,
	ItemListComponent
	// EchartsComponent
]



