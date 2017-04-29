import { Component,ViewChild } from '@angular/core';

import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { RecommandPage } from '../recommand/recommand';
import { Tabs } from "ionic-angular";
@Component({
	templateUrl: 'tabs.html'
})
export class TabsPage {
	@ViewChild('mainTabs') tabs: Tabs;
	// this tells the tabs component which Pages
	// should be each tab's root Page
	tab1Root: any = HomePage;
	tab2Root: any = AboutPage;
	tab3Root: any = RecommandPage;
	tab4Root: any = ContactPage;

	constructor() {

	}
}
