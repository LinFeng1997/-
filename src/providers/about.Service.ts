/*
* Created by Blow on 2017-04-16
 */
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs";
import { AbstractService } from "../interfaces/abstract-service";
import { UserInfor } from "../entities/UserInfor";
import { AbstractDataService } from "../interfaces/abstract.data.service";
import { AppConfig } from "../app/app.config";
/*
细节服务（课程班和老师）
 */
@Injectable()
export class AboutService extends AbstractService {
	constructor(private dataService: AbstractDataService, cfg: AppConfig) {
        super(dataService, cfg); // constructors in derived classes must call super()
    }

       /**
     * 获取选课验证码
     * @returns {Observable<any>}
     */
    userChooseCourseValidate(): Observable<any> {
        let res = this.dataSvc.getData('v5api/api/xk/Captcha', null);
        console.log(res);
        return res;
    }

}