/*
* Created by Blow on 2017-05-30
 */
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs";
import { AbstractService } from "../interfaces/abstract-service";
import { AbstractDataService } from "../interfaces/abstract.data.service";
import { AppConfig } from "../app/app.config";
/*
推荐服务
 */
@Injectable()
export class RecommendationService extends AbstractService {
    constructor(private dataService: AbstractDataService, cfg: AppConfig) {
        super(dataService, cfg); // constructors in derived classes must call super()
    }

    /**
  * 获取以人荐课
  * @returns {Observable<any>}
  */
    queryRecommendation(name): Observable<any> {
        //交换临时url和基础url
        [this.cfg.config.webBaseUrl, this.cfg.config.webTmpUrl] = [this.cfg.config.webTmpUrl, this.cfg.config.webBaseUrl];
        let res = this.dataSvc.postData(`recommend/${name}`, null);
        console.log(res);
        //交换回去临时url和基础url
        [this.cfg.config.webBaseUrl, this.cfg.config.webTmpUrl] = [this.cfg.config.webTmpUrl, this.cfg.config.webBaseUrl];
        return res;
    }

}