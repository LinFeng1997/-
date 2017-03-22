/**
 * Modify by Blow on 2017-03-06.
 */
import {Injectable} from "@angular/core";

/**
 * 抽象数据实体
 */
@Injectable()
export class AbstractEntity {
    /**
     * 物理键
     */
    _id:string;

    /**
     * 编码
     */
    code:string;

    /**
     * 排序
     */
    displayOrder:number;
}