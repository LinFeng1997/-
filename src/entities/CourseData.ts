/*
 成绩信息
 */
export class CourseData {

	semesterId: string;

	courseName: string;

	result: string;

	gpa: string;

	credit: string;


	constructor(semesterId?: string, courseName?: string,result?: string,gpa?: string,credit?: string,) {

		if (semesterId) this.semesterId = semesterId;
		if (courseName) this.courseName = courseName;
		if (result) this.result = result;
		if (gpa) this.gpa = gpa;
		if (credit) this.credit = credit;
	}
}