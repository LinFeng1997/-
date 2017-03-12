// Dev
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);

// //Release
// import { enableProdMode } from '@angular/core';
// import { platformBrowser } from '@angular/platform-browser';
// import { AppModuleNgFactory } from '../../aot/src/app/app.module.ngfactory';

// enableProdMode();
// platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);