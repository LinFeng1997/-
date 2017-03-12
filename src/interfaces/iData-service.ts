/**
 * Created by Blow on 2017-03-06.
 */
import { Observable } from "rxjs";

//noinspection TypeScriptUnresolvedVariable

export  interface iDataService {

    /**
     * 请求数据
     * @param cmd
     * @param data
     * @return Observable<any>
     */
    getData(cmd: string, data: any): Observable<any>;

    /**
     * put数据
     * @param cmd
     * @param data
     * @return Observable<any>
     */
    putData(cmd: string, data: any,head?:any): Observable<any>;

    /**
     * post数据
     * @param cmd
     * @param data
     * @return Observable<any>
     */
    postData(cmd: string, data: any,head?:any, jsonData?: boolean): Observable<any>;

    /**
     * delete数据
     * @param cmd
     * @param data
     * @return Observable<any>
     */
    deleteData(cmd: string, data: any): Observable<any>;

}