/**
 * Modify by Blow on 2017-03-06.
 */
import { Observable } from "rxjs";

//noinspection TypeScriptUnresolvedVariable

export  interface iDataService {

    /**
     * 请求数据
     * @param cmd 拼接的url
     * @param data  携带的报文数据
     * @return Observable<any>
     */
    getData(cmd: string, data: any): Observable<any>;

    /**
     * put数据
     * @param cmd 拼接的url
     * @param data  携带的报文数据
     * @param head  携带的报文头
     * @return Observable<any>
     */
    putData(cmd: string, data: any,head?:any): Observable<any>;

    /**
     * post数据
     * @param cmd 拼接的url
     * @param data  携带的报文数据
     * @param head  携带的报文头
     * @param josnData  是否是json格式
     * @return Observable<any>
     */
    postData(cmd: string, data: any,head?:any, jsonData?: boolean): Observable<any>;

    /**
     * delete数据
     * @param cmd 拼接的url
     * @param data  携带的报文数据
     * @return Observable<any>
     */
    deleteData(cmd: string, data: any): Observable<any>;

}