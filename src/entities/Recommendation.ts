/**
 * Created by Blow on 2017-05-30.
 */
/*
 urp用户
 */
export class Recommendation {

    name:string;

    college:string;

    sex:string;

	constructor(name?: string, college?:string,sex?:string) {
        if (name) this.name = name;
        if (college) this.college = college;
        if (sex) this.sex = sex;
    }
}