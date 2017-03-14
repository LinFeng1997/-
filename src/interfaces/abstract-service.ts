import {Injectable} from '@angular/core';
import {AbstractDataService} from "./abstract.data.service";
import {AppConfig} from "../app/app.config";
import {Observable} from "rxjs";
import {isUndefined} from "ionic-angular/util/util";
//import {errorHandler} from "@angular/platform-browser/src/browser";


declare let moment: any;

//import * as PouchDB from 'pouchdb';
//import 'pouchdb';
//
declare var PouchDB: any;
//本地数据缓存
//declare var PouchDB: any;

/**
 *  抽象服务，包含了基本的服务方法定义
 */
@Injectable()
export class AbstractService {

    protected static _pouchDB: any;

    /**
     * 数据服务上下文
     */
    protected static CacheDb(): any {

        //
        if (AbstractService._pouchDB == null)
            AbstractService._pouchDB = new PouchDB(AppConfig.PouchDBConfig.dbName);

        return AbstractService._pouchDB;
    }


    //
    constructor(protected dataSvc: AbstractDataService, protected cfg: AppConfig) {
        
        if (AppConfig.debug)
            console.log(`${cfg.config.logTAG}ctox AbstractService Provider`);
    }

    //
    private mkRslt(arr) {
        var arrRslt = [''];
        for (var i = 0, len = arr.length; i < len; i++) {
            var str = arr[i];
            var strlen = str.length;
            if (strlen == 1) {
                for (var k = 0; k < arrRslt.length; k++) {
                    arrRslt[k] += str;
                }
            } else {
                var tmpArr = arrRslt.slice(0);
                arrRslt = [];
                for (k = 0; k < strlen; k++) {
                    //复制一个相同的arrRslt   
                    var tmp = tmpArr.slice(0);
                    //把当前字符str[k]添加到每个元素末尾   
                    for (var j = 0; j < tmp.length; j++) {
                        tmp[j] += str.charAt(k);
                    }
                    //把复制并修改后的数组连接到arrRslt上   
                    arrRslt = arrRslt.concat(tmp);
                }
            }
        }
        return arrRslt;
    }



//#endregion


    //
    //#region 数据缓存

    /**
     * 添加数据到缓存，如果指定的键已存在，则覆盖。
     * @param key
     * @param data
     * @param expireTime number 过期时间（分钟）
     * @returns {Observable<T>}
     */
    addCache(key: string, data: any, expireTime?: number): Observable<any> {

        var set;
        let me = this;
        data._id = key;

        if (expireTime == null || isUndefined(expireTime))
            expireTime = 0;

        //添加缓存操作
        let doSet = (tp: string = 'add') => {

            var d;

            if (data == null || data == {}) return;

            d = {_id: key, cacheDate: '', data: [], isArray: false}; //封装数组到包转对象

            //不缓存空对象
            if (Array.isArray(data)) {
                if (data.length === 0) return;
                d.data = data;
                d.isArray = true;
            }
            else {
                d.data.push(data);
                d.isArray = false;
            }

            //添加查询键
            d.cacheDate = moment().valueOf();
            d.expireTime = expireTime;//过期时间，将在获取缓存时进行计算。
            //
            //放置到缓存
            set = AbstractService.CacheDb().put(d)
                .then(function (response) {
                    if (AppConfig.debug) {
                        if (tp === "modify")
                            console.log(`${me.cfg.config.logTAG}缓存Key:${key}修改插入成功:${JSON.stringify(d)}`);
                        else
                            console.log(`${me.cfg.config.logTAG}第一次插入Key:${key}的缓存:${JSON.stringify(d)}`);
                    }
                }).catch(function (err) {
                    if (AppConfig.debug)
                        console.log(`${me.cfg.config.logTAG}添加缓存出错:${JSON.stringify(err)}`);
                });
        };

        //

        set = AbstractService.CacheDb().get(key)
            .then(function (doc) {
                AbstractService.CacheDb().remove(doc);
            }).then(function (result) {
                doSet('modify');
            }).catch(function (err) {
                doSet('add');
            });

        //
        let act = Observable.fromPromise(set);

        return act;
    }

    /**
     * 获取缓存中的数据
     * @param key
     * @returns {Observable<T>}
     */
    getCache(key: string, autoRefresh?: boolean): Observable<any> {
        let me = this;

        if (autoRefresh == null || isUndefined(autoRefresh))
            autoRefresh = true;

        var set = AbstractService.CacheDb().get(key)

        let act = Observable
            .fromPromise(set)
            .map(d => {
                //拆包
                if (d == null)
                    return null;

                //判断是否存在缓存时间控制。
                if (!isUndefined(d['expireTime']) && d['expireTime'] != null) {
                    let exp = d['expireTime'];
                    let cacheDate = d['cacheDate'];
                    //需要过期判断
                    if (autoRefresh === true && exp > 0) {


                        //  let oldDate =
                        //
                        let currffSet = moment().valueOf();

                        let offSet = (currffSet - cacheDate) / 60000;
                        if (AppConfig.debug)
                            console.log('offset:' + offSet);

                        //
                        if (offSet > exp) {
                            me.deleteCache(key);//缓存已过期
                            return null;
                        }
                    }
                }

                //
                let lst = d['data'];
                if (d['isArray'] && d['isArray'] == true)
                    return lst;

                return lst[0];
            });

        return act;
    }

    /**
     * 获取缓存中的数据
     * @param key
     * @returns {Observable<T>}
     */
    async getCacheAsync(key: string, autoRefresh?: boolean) {
        let me = this;

        if (autoRefresh == null || isUndefined(autoRefresh))
            autoRefresh = true;

        try {

            let d = await AbstractService.CacheDb().get(key)

            //拆包
            if (d == null)
                await Promise.reject(`缓存${key}丢失`);

            //判断是否存在缓存时间控制。
            if (!isUndefined(d['expireTime']) && d['expireTime'] != null) {
                let exp = d['expireTime'];
                let cacheDate = d['cacheDate'];


                //需要过期判断
                if (autoRefresh === true && exp > 0) {

                    //
                    let currffSet = moment().valueOf();

                    let offSet = (currffSet - cacheDate) / 60000;
                    if (AppConfig.debug)
                        console.log('offset:' + offSet);

                    //
                    if (offSet > exp) {
                        me.deleteCache(key);//缓存已过期
                        await Promise.reject(`缓存${key}已过期`);
                    }
                }
            }

            if (AppConfig.debug)
                console.log(`${this.cfg.config.logTAG}找到缓存key:${key}的数据:${JSON.stringify(d)}`);

            //
            let lst = d['data'];
            if (d['isArray'] && d['isArray'] == true)
                return lst;

            return lst[0];
        }
        catch (err) {
            // if (AppConfig.debug)
            console.log(`${me.cfg.config.logTAG}没有找到键值${key}的缓存数据~: ${err}`);

            return await Promise.reject(err);
        }
    }

    /**
     * 删除缓存
     * @param key
     */
    async deleteCache(key: string) {
        let me = this;


        try {
            //
            let doc = await AbstractService.CacheDb().get(key);

            if (doc != null) {
                await AbstractService.CacheDb().remove(doc);

                if (AppConfig.debug)
                    console.log(`${me.cfg.config.logTAG}cache key:${key} delete success`);
            }

            /*
             .then(function (doc) {
             AbstractService.CacheDb().remove(doc);
             if (AppConfig.debug)
             console.log(`${me.cfg.config.logTAG}cache key:${key} delete success`);
             }).catch(function (err) {
             if (AppConfig.debug)
             console.log(`${me.cfg.config.logTAG}cache key:${key} delete fail`);
             });


             var doc =  db.get('mydoc');
             var response = await db.remove(doc);
             */

        } catch (err) {

            if (AppConfig.debug)
                console.log(`${me.cfg.config.logTAG}cache key:${key} delete fail: ${err.message}`);
        }


    }

    /**
     * 删除所有缓存
     */
    async  clearCache() {

        let me = this;

        try {
            //
            await AbstractService.CacheDb().destroy();

            if (AppConfig.debug)
                console.log(`${me.cfg.config.logTAG}cache DB clear success`);

            //重新初始化
            AbstractService._pouchDB = null;//.CacheDb() = new PouchDB(AppConfig.PouchDBConfig.dbName);
        }
        catch (err) {
            if (AppConfig.debug)
                console.log(`${me.cfg.config.logTAG}cache DB clear fail:${err}`);
        }


    }

    /**
     *根据缓存情况直接获取或自动进行查询。
     * @param key
     * @param query
     * @returns {any}
     */
    getWtihCache<T>(key: string, query: Observable<T>): Observable<T> {
        //获取缓存
        let act = Observable.create(subscriber => {

            //
            this.getCacheAsync(key)
                .then(
                    datas => {
                        subscriber.next(datas);
                    }
                )
                .catch(
                    er => {
                        //如果没有数据则，延迟一下执行。要不然可能会和之前的删除冲突
                        setTimeout(() => {
                            //进行查询
                            query.subscribe(
                                sts => {
                                    subscriber.next(sts);
                                },
                                er => {
                                    subscriber.error(er);
                                }
                            );
                        }, 150);
                    }
                );
        });

        return act;
    }

    //#endregion
    

}
