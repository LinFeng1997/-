import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/observable';
import {Observable} from "rxjs";
import {AbstractDataService} from "../../interfaces/abstract.data.service";
import {AppConfig} from "../../app/app.config";

/*
 http数据服务
 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 * Modified by Blow on 2017-03-22
 */
@Injectable()
export class HttpDataService extends AbstractDataService {

    constructor(protected http: Http, protected cfg: AppConfig) {
        super(cfg);
        if (AppConfig.debug)
            console.log(`${cfg.config.logTAG}ctox HttpDataService Provider`);
    }


    //#region 参数处理


    //#endregion


    /**
     * 获取数据
     * @param cmd 拼接的url
     * @param data  携带的报文数据
     * @return Observable<any>
     */
    getData(cmd: string, data: any): Observable<any> {

        if (AppConfig.debug)
            console.log(`${this.cfg.config.logTAG}in HttpDataService getData method`);
        //Todo:多个url选择性传参
        let url = this.getApiUrl(cmd);

        var opts = this.ensureGetOptions(data); //获取包含认证信息的头文件

        var res = this.http.get(url, opts)
            .timeout(AppConfig.dataQueryTimeout)
            .map(this.extractData)
            .catch(this.handleError);

        return res;

    }
     
    /**
     * put数据
     * @param cmd 拼接的url
     * @param data  携带的报文数据
     * @param head  携带的报文头
     * @return Observable<any>
     */
    putData(cmd: string, data: any, head?: any): Observable<any> {
        if (AppConfig.debug)
            console.log(`${this.cfg.config.logTAG}in HttpDataService putData method`);

        let url = this.getApiUrl(cmd);

        var opts = this.ensureHeaderOptions(head); //获取包含认证信息的头文件

        var res = this.http.put(url, JSON.stringify(data), opts)
        .timeout(AppConfig.dataPostTimeout)    
        .map(this.extractData)
            .catch(this.handleError);

        return res;
    }

    /**
     * post数据
     * @param cmd 拼接的url
     * @param data  携带的报文数据
     * @param head  携带的报文头
     * @param josnData  是否是json格式
     * @return Observable<any>
     */
    postData(cmd: string, data: any, head?: any, jsonData?: boolean): Observable<any> {
        if (AppConfig.debug)
            console.log(`${this.cfg.config.logTAG}in HttpDataService postData method`);

        let url = this.getApiUrl(cmd);

        // var opts = this.ensureGetOptions(null); //获取包含认证信息的头文件
        var opts = this.ensureHeaderOptions(head); //获取包含认证信息的头文件
        var dt = data;

        //json化
        // if (jsonData==null || jsonData==true)
        //     dt = JSON.stringify(data)
        // else
        // dt = data;
        var res = this.http.post(url, dt, opts)
        .timeout(AppConfig.dataPostTimeout)            
            .map(this.extractData)
            .catch(this.handleError);

        return res;
    }

     /**
     * delete数据
     * @param cmd 拼接的url
     * @param data  携带的报文数据
     * @return Observable<any>
     */
    deleteData(cmd: string, data: any): Observable<any> {
        if (AppConfig.debug)
            console.log(`${this.cfg.config.logTAG}in HttpDataService deleteData method`);

        let url = this.getApiUrl(cmd);

        var opts = this.ensureGetOptions(data); //获取包含认证信息的头文件

        var res = this.http.delete(url, opts)
        .timeout(AppConfig.dataPostTimeout)            
            .map(this.extractData)
            .catch(this.handleError);

        return res;
    }
}
