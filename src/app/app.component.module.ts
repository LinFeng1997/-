import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';

import { AboutPage } from '../pages/about/about';
import { CourseListPage  } from '../pages/about/course-list';
import { TeacherListPage  } from '../pages/about/teacher-list';

import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';

import { LoginComponent } from '../components/login-one/login-one';
import { ChartsComponent } from '../components/charts/charts';
// import { EchartsComponent } from '../components/echarts/echarts';


/**
 * 申明组
 * @type {(MyApp|HomePage|somePage|TabsPage|ErrorPage)[]}
 */
export const AppComponents: any = [
	MyApp,
	TabsPage,
	AboutPage,
	CourseListPage,
	TeacherListPage,
	ContactPage,
	HomePage,
	LoginComponent,
	ChartsComponent,
	// EchartsComponent
]



