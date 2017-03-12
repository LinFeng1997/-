import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { LoginComponent } from '../components/login-one/login-one';
import { ChartsComponent } from '../components/charts/charts';


/**
 * 申明组
 * @type {(MyApp|SelfPage|ServicePage|HomePage|TabsPage|ErrorPage)[]}
 */
export const AppComponents: any = [
	MyApp,
	TabsPage,
	AboutPage,
	ContactPage,
	HomePage,
	LoginComponent,
	ChartsComponent
]