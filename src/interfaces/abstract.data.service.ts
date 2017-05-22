import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Response, URLSearchParams, Headers, RequestOptions} from "@angular/http";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";

//
import {iDataService} from "./iData-service";
import {AppConfig} from "../app/app.config";
import {ErrorDescription} from "../entities/ErrorDescription";


/*
 抽象数据服务
 * Modified by Blow on 2017-03-06
 */
@Injectable()
export abstract class AbstractDataService implements iDataService {

    protected Config: AppConfig;

    //构造配置文件
    constructor(protected cfg: AppConfig) {

        this.Config = cfg;

        if (AppConfig.debug)
            console.log(`${cfg.config.logTAG}ctox AbstractDataService Provider`);
    }


    //#region 数据获取接口方法，由HttpDataService具体实现

    abstract getData(cmd: string, data: any): Observable<any>;

    abstract putData(cmd: string, data: any, head?: any): Observable<any>;

    abstract postData(cmd: string, data: any, head?: any, jsonData?: boolean): Observable<any>;

    abstract deleteData(cmd: string, data: any): Observable<any>;

    //#endregion


    //#region 辅助方法

    //#region 参数处理

    /**
     * 包装成查询字符串
     * @param data
     * @returns params:URLSearchParams
     * https://www.angular.cn/docs/ts/latest/api/http/index/URLSearchParams-class.html
     */
    warpToQueryString(data: any): URLSearchParams {
        if (data == null)
            return null;

        let params = new URLSearchParams();

        //
        for (var key in data) {
            if (data.hasOwnProperty(key))
                params.set(key, data[key]);
        }

        return params;
    }

    /**
     * 确保非Get请求头。可能用于认证信息  //Todo:urp的浏览器端跨域还是个问题
     * @param header
     * @returns {Headers}
     */
    ensureHeaderOptions(header: any): RequestOptions {
        var headers;
        headers = new Headers(
            {
                'Content-Type': 'application/json',
                "Authorization":`Bearer ${this.cfg.config.urpToken}`,
                "Access-Control-Allow-Origin": "*",
                "proxyUrl": "http://202.203.209.96"

            });

        //从指定头复制信息
        if (header != null) {
            headers['Content-Type'] = header['Content-Type'];
        }

        // let params = this.warpToQueryString(data); //包装查询参数

        let opts = new RequestOptions(
            {
                headers: headers,
                search: null
            }
        );

        return opts;
    }


    /**
     * 确保请求头。可能用于认证信息
     * @param data
     * @returns {Headers}
     */
    ensureGetOptions(data: any): RequestOptions {
        let headers = new Headers(
            {
                'Content-Type': 'application/json',
                "Authorization":`Bearer ${this.cfg.config.urpToken}`,
                "Access-Control-Allow-Origin": "*",
                "code": `${this.cfg.config.code}`,
                // "code": "f01b0fd2-4db5-56dd-bd8c-8602eac1832d",
                "id":`${this.cfg.config.id}`
            });


        let params = this.warpToQueryString(data); //包装查询参数

        let opts = new RequestOptions(
            {
                headers: headers,
                search: params
            }
        );

        return opts;
    }

    //#endregion
    /**
     * 获取默认api调用连接
     * @param cmd 子url
     * @returns {any|{}} 完整url
     */
    protected getApiUrl(cmd: string) {

        let url = this.Config.config.webBaseUrl + cmd;

        return url;
    }


    /**
     * 数据萃取
     * @param res 服务器的响应
     * @returns {从响应获取 json 对象|{}}
     * @remark 注意不同服务器的返回值拆包可能各有不同。
     */
    protected extractData(res: Response) {
        try {
            let data = res.json();//从响应获取 json 对象。
            return data || {};
        } catch (er) {
            return res.text();
        }
    }

    /**
     * 通用移除处理
     * @param error
     * @returns {ErrorObservable}
     */
    protected handleError(error: any): ErrorObservable<ErrorDescription> {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let jsonDesc: any = null;

        //封装原始的错误信息
        let errorDesc = new ErrorDescription();

        if (error.status == 401) {
            error.message = '当前用户登录已经失效，请重新登录';
        }
        else if (error.status == 0) {
            error.message = '无法访问网络，请检察您的网络连接后重试！';
            //alert('无法访问网络，请检察您的网络连接后重试！');
        }
        //先输出调试
        try {
            if (AppConfig.debug)
                console.log(error);
        }
        catch (ex) {
            console.log(ex);
        }
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : '服务器访问出错';
       
        //严重的空返回错误会导致这里无法解析
        try {
            jsonDesc = error.json();
        }
        catch (ex) {

            errorDesc.status = 0;
            errorDesc.message = errMsg;
            console.log(ex);
        }
        if (jsonDesc != null) {

            errorDesc.status = error.status;
            errorDesc.ok = error.ok;

            if (jsonDesc.message != null )
                errorDesc.message = jsonDesc.message;
            else
                errorDesc.message = errMsg;

            //从错误实体里取出详细信息描述
            if (jsonDesc.error != null )
                errorDesc.error = jsonDesc.error;
            if (jsonDesc.error_description != null )
                errorDesc.error_description = jsonDesc.error_description;
            else
                errorDesc.error = errMsg;

            errorDesc.date = jsonDesc.date;
            console.log("errdes");
            // console.log(jsonDesc.error_description);
            // console.log(errorDesc.error_description);
        }

        console.log(`ionic:error:${errMsg} 来自AbstractDataService的handleError`); // log to console instead

        return Observable.throw(errorDesc);
    }

    //#endregion
   
}
