/**
 * Created by Blow on 2017-04-02.
 */

/**
 * 课程
 */

export class CourseModel {
	courseNumber:string;

	done:any;

	constructor(courseNumber:string, done:any) {
		this.courseNumber = courseNumber;
		this.done = done;
	}
}

