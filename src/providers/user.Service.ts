import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs";
import { AbstractService } from "../interfaces/abstract-service";
import { UserInfor } from "../entities/UserInfor";
import { AbstractDataService } from "../interfaces/abstract.data.service";
import { AppConfig } from "../app/app.config";
/*
用户服务
 */
@Injectable()
export class UserService extends AbstractService {

    constructor(private dataService: AbstractDataService, cfg: AppConfig) {
        super(dataService, cfg); // constructors in derived classes must call super()

    }

    /**
     * 获取urp验证码
     * @returns {Observable<any>}
     */
    userUrpValidate(): Observable<any> {
        let res = this.dataSvc.getData('v5api/api/GetLoginCaptchaInfo/d172a5d9-8df0-4983-91a3-db6bb47855bc', null);
        // let res = this.dataSvc.getData('urp/validate', null);
        console.log(res);
        return res;
    }
    /**
     * urp用户登录
     * @param validate 验证码
     * @param temp     服务器端返回的临时变量
     * @param userName 用户名
     * @param password 密码
     * @returns {Observable<any>}
     */
    userUrpLogin(validate: string, temp: string, username: string, password: string): Observable<any> {
        let n = `grant_type=password&username=${username}&password=${password}%7C${validate}*${temp}&client_id=ynumisSite`;
        let res = this.dataSvc.postData(`v5api/OAuth/Token`, n)
        // let n = {grant_type:'password',username:username,password:`${password}%7C${validate}*${temp}`,client_id:'ynumisSite'}
        // let res = this.dataSvc.postData(`urp/login`, n,null,false)
        console.log(res);
        return res;
    }
    /**
    * urp用户成绩
    * @param token urp授权令牌
    * @returns {Observable<any>}
    */
    userUrpGrade(token: string): Observable<any> {
        this.cfg.config.urpToken = token;
        console.log(this.cfg.config.urpToken);
        let res = this.dataSvc.getData('v5api/api/Result', null);
        console.log(res);
        return res;
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

    /**
     * 选课
     * @param courseNumber 课程代码 validate 选课验证码
     * @returns {Observable<any>}
     */
    userChooseCourse(courseNumber, validate): Observable<any> {
        let n = { id: courseNumber, captcha: validate };
        let res = this.dataSvc.postData(`v5api/api/xk/addDirect`, n)
        console.log(res);
        return res;
    }

    /**
     * 获取评估信息
     * @param teachClassId, comment
     * @returns {Observable<any>}
     */
    getEvaluation(): Observable<any> {
        let res = this.dataSvc.getData(`v5api/api/TeachEvaluation`, null)
        // console.log(res);
        return res;
    }


    /**
     * 评估
     * @param teachClassId, comment
     * @returns {Observable<any>}
     */
    userEvaluation(teachClassId, comment): Observable<any> {
        let random1 =~~(Math.random()*14);
        let random2 =~~(Math.random()*14);
        while(random2==random1){
            random2 =~~(Math.random()*14);
        }
        let tmp = [];
        for(let i = 0;i<14;i++){
            tmp[i] = "1";
        }
        tmp[random1] = tmp[random2] = "2";
        let answerStr = tmp.join("");
        let n = { TeachClassId: teachClassId,Score:0,SurveyAnswerStr:answerStr,Comment: comment };
        let res = this.dataSvc.postData(`v5api/api/TeachEvaluation`, n)
        console.log(res);
        return res;
    }


    static user: Array<UserInfor> = [
        new UserInfor('', '', 0, '', 0, false),
    ];

    /**
  * 获取首次用户信息
  */
    loadUserData(): Observable<UserInfor[]> {
        return Observable.of(
            UserService.user
        );
    }


}