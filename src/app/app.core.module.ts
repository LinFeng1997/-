import { ModuleWithProviders, NgModule, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { IonicErrorHandler } from "ionic-angular";

//配置服务
import { AppConfig } from './app.config';


//数据服务
import { AbstractDataService } from "../interfaces/abstract.data.service";
import { AbstractService } from "../interfaces/abstract-service";
import { HttpDataService } from "../providers/datas/httpData.Service";

//业务服务
import { UserService } from "../providers/user.Service";

//自定义管道
import { SafeHtmlPipe } from '../pipes/safeHtml.pipe';
import { SafeScriptPipe } from '../pipes/safeScript.pipe';
import { SafeStylePipe } from '../pipes/safeStyle.pipe';
import { SafeUrlPipe } from '../pipes/safeUrl.pipe';
import { SafeResourceUrlPipe } from '../pipes/safeResourceUrl.pipe';


//Directives

@NgModule({
	imports: [CommonModule, FormsModule],//,JsonpModule
	declarations: [SafeHtmlPipe, SafeScriptPipe, SafeStylePipe, SafeUrlPipe, SafeResourceUrlPipe],
	exports: [SafeHtmlPipe, SafeScriptPipe, SafeStylePipe, SafeUrlPipe, SafeResourceUrlPipe],
	providers: [
		AppConfig,
		HttpDataService,
		AbstractService,
		{ provide: AbstractDataService, useExisting: HttpDataService },
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		UserService
		// InfoService
	],
})
export class CoreModule {
	constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
		if (parentModule) {
			throw new Error('默认服务配置模块已经存在，请勿重复导入！');
		}
	}

	static forRoot(): ModuleWithProviders {
		return {
			ngModule: CoreModule,
			providers: []
		};
	}
}