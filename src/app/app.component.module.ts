//组件声明文件
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
//测试页
import { ContactPage } from '../pages/contact/contact';
import { ChooseCoursePage } from '../pages/home/choose-course';


import { ChartsComponent } from '../components/charts/charts';





/**
 * 申明组
 * @type {(MyApp|HomePage|somePage|TabsPage|ErrorPage)[]}
 */
export const AppComponents: any = [
	MyApp,
	TabsPage,
	ContactPage,

	ChooseCoursePage,
	ChartsComponent,
]



