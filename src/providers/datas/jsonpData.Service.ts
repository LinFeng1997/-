import {Injectable} from '@angular/core';
import {Jsonp} from '@angular/http';
import 'rxjs/observable';
import { Observable } from "rxjs";
import { AbstractDataService } from "../../interfaces/abstract.data.service";
import { AppConfig } from "../../app/app.config";
/*
 http数据服务
 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 * Modified by Hamlet on 2016-11-03
 */
@Injectable()
export class JsonpDataService extends AbstractDataService {
    // http:Jsonp;

    constructor(protected jsonp: Jsonp, protected cfg: AppConfig) {
        super(cfg);
        if (AppConfig.debug)
            console.log('ctox JsonpDataService Provider');
/*
        //
        var injector = ReflectiveInjector.resolveAndCreate([
            {provide: Jsonp, useFactory:
                function(backend, defaultOptions) {
                    defaultOptions.headers.append("TG-DEBUG", "true");
                    return new Jsonp(backend, defaultOptions);
                },
                deps: [ConnectionBackend, BaseRequestOptions]
            }
        ]);

        //
        this.http = injector.get(Jsonp);
        */
    }


    /**
     * 获取数据
     */
    getData(cmd: string, data: any): Observable<any> {

        if (AppConfig.debug)
            console.log('in JsonpDataService getData method');

        let url = this.getApiUrl(cmd);

        var opts = this.ensureGetOptions(data); //获取包含认证信息的头文件


        var res = this.jsonp.get(url, opts)
            .map(this.extractData)
            .catch(this.handleError);

        return res;

    }

    putData(cmd: string, data: any, head?: any): Observable<any> {
        if (AppConfig.debug)
            console.log('in HttpDataService putData method');

        let url = this.getApiUrl(cmd);

        var opts = this.ensureGetOptions(null); //获取包含认证信息的头文件

        var res = this.jsonp.put(url, JSON.stringify(data), opts)
            .map(this.extractData)
            .catch(this.handleError);

        return res;
    }

    postData(cmd: string, data: any, head?: any, jsonData?: boolean): Observable<any> {
        if (AppConfig.debug)
            console.log('in HttpDataService postData method');

        let url = this.getApiUrl(cmd);

        var opts = this.ensureGetOptions(null); //获取包含认证信息的头文件

        var res = this.jsonp.post(url, JSON.stringify(data), opts)
            .map(this.extractData)
            .catch(this.handleError);

        return res;
    }

    deleteData(cmd: string, data: any): Observable<any> {
        if (AppConfig.debug)
            console.log(`${this.cfg.config.logTAG}in HttpDataService deleteData method`);

        let url = this.getApiUrl(cmd);

        var opts = this.ensureGetOptions(null); //获取包含认证信息的头文件

        var res = this.jsonp.delete(url, opts)
            .map(this.extractData)
            .catch(this.handleError);

        return res;
    }

}
