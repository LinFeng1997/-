/**
 * Created by Blow on 2017-03-06.
 */
/*
 成绩信息
 */
export class CourseData {

	semesterId: string;

	courseName: string;

	courseNature:string;

	result: string;

	gpa: string;

	credit: string;


	constructor(semesterId?: string,courseName?: string, courseNature?:string,result?: string, gpa?: string, credit?: string, ) {

		if (semesterId) this.semesterId = semesterId;
		if (courseName) this.courseName = courseName;
		if (courseNature) this.courseNature = courseNature;
		if (result) this.result = result;
		if (gpa) this.gpa = gpa;
		if (credit) this.credit = credit;
	}
}