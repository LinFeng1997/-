/**
 * Modify by Blow on 2017-03-22.
 */
import { Injectable } from '@angular/core';
import { AbstractDataService } from "./abstract.data.service";
import { AppConfig } from "../app/app.config";
import { Observable } from "rxjs";
import { isUndefined } from "ionic-angular/util/util";
//import {errorHandler} from "@angular/platform-browser/src/browser";


declare let moment: any;

//本地数据缓存

declare var PouchDB: any;


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

    //#endregion


    //
    //#region 数据缓存

    /**
     * 添加数据到缓存，如果指定的键已存在，则覆盖。
     * @param key    键
     * @param data    数据
     * @param expireTime number 过期时间（分钟）
     * @returns {Observable<T>}
     */
    addCache(key: string, data: any, expireTime?: number): Observable<any> {

        var set;
        let me = this;
        data._id = key;
        // console.log(data._id);
        // 过期
        if (expireTime == null || isUndefined(expireTime))
            expireTime = 0;

        //添加缓存操作，默认是add
        let doSet = (tp: string = 'add') => {

            var d;
            // console.log("data:")
            // console.log(data)

            if (data == null || data == {}) return;
            //封装数组到包转对象
            d = { _id: key, cacheDate: '', data: [], isArray: false };

            //不缓存空对象
            if (Array.isArray(data)) {
                console.log("是数组啦！")
                if (data.length === 0) return;
                d.data = data;
                d.isArray = true;
            }
            else {
                console.log("不是数组啦！")

                d.data.push(data);
                d.isArray = false;
            }

            //添加查询键
            d.cacheDate = moment().valueOf();
            d.expireTime = expireTime;//过期时间，将在获取缓存时进行计算。
            //
            //放置到缓存
            set = AbstractService.CacheDb().put(d)
                .then(function(response) {
                    if (AppConfig.debug) {
                        if (tp === "modify")
                            console.log(`${me.cfg.config.logTAG}缓存Key:${key}修改插入成功:${JSON.stringify(d)}`);
                        else
                            console.log(`${me.cfg.config.logTAG}第一次插入Key:${key}的缓存:${JSON.stringify(d)}`);
                    }
                }).catch(function(err) {
                    if (AppConfig.debug)
                        console.log(`${me.cfg.config.logTAG}添加缓存出错:${JSON.stringify(err)}`);
                });
        };

        //

        set = AbstractService.CacheDb().get(key)
            .then(function(doc) {
                AbstractService.CacheDb().remove(doc);
            }).then(function(result) {
                doSet('modify');
            }).catch(function(err) {
                doSet('add');
            });

        //
        let act = Observable.fromPromise(set);

        return act;
    }

    /**
     * 获取缓存中的数据(异步)
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
     * 删除缓存(异步)
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
