/**
 * Created by Blow on 2017-04-02.
 */

/**
 * 来自服务器的错误信息描述
 */

export class CourseModel {
	courseNumber:string;

	done:any;

	constructor(courseNumber:string, done:any) {
		this.courseNumber = courseNumber;
		this.done = done;
	}
}

