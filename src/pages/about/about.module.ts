import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
//教师和成绩教学班相关
import { AboutPage } from './about';
import { AboutListPage } from './about-list';
import { DetailsPage } from './details';
import { TokenValidatePage } from './token-validate';
import { ItemListComponent } from './../../components/item-list/item-list';
import { PieChartComponent } from './../../components/pie-chart/pie-chart';

@NgModule({
	declarations: [
		AboutPage,
		AboutListPage,
		DetailsPage,
		TokenValidatePage,
		ItemListComponent,
		PieChartComponent
	],
	imports: [
		IonicPageModule.forChild(AboutPage),
		IonicPageModule.forChild(AboutListPage),
		IonicPageModule.forChild(DetailsPage),
		IonicPageModule.forChild(TokenValidatePage),
		IonicPageModule.forChild(ItemListComponent),
		IonicPageModule.forChild(PieChartComponent),
	],
	exports: [
		AboutPage
	]
})
export class AboutModule { }
