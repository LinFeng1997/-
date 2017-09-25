/**
 * Created by Blow on 2017-03-06.
 */

import {AbstractEntity} from "../interfaces/abstract.entity";

/**
 * 来自服务器的错误信息描述
 */
export class ErrorDescription extends AbstractEntity{
    status: number;

    ok: boolean;

    message: string;

    error: string;

    date: string;

    error_description:string;
}