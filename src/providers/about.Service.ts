/*
* Created by Blow on 2017-04-16
 */
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs";
import { AbstractService } from "../interfaces/abstract-service";
// import { UserInfor } from "../entities/UserInfor";
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
  * 获取教师详细信息
  * @returns {Observable<any>}
  */
    queryTeacher(name): Observable<any> {
        //交换临时url和基础url
        [this.cfg.config.webBaseUrl, this.cfg.config.webTmpUrl] = [this.cfg.config.webTmpUrl, this.cfg.config.webBaseUrl];
        let res = this.dataSvc.getData(`teacher/${name}`, null);
        console.log(res);
        //交换回去临时url和基础url
        [this.cfg.config.webBaseUrl, this.cfg.config.webTmpUrl] = [this.cfg.config.webTmpUrl, this.cfg.config.webBaseUrl];
        return res;
    }

    queryCourse(name): Observable<any> {
        //交换临时url和基础url
        [this.cfg.config.webBaseUrl, this.cfg.config.webTmpUrl] = [this.cfg.config.webTmpUrl, this.cfg.config.webBaseUrl];
        let res = this.dataSvc.getData(`course/${name}`, null);
        console.log(res);
        //交换回去临时url和基础url
        [this.cfg.config.webBaseUrl, this.cfg.config.webTmpUrl] = [this.cfg.config.webTmpUrl, this.cfg.config.webBaseUrl];
        return res;
    }

}