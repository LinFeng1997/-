
/*
 用户学生
 */
export class UserInfor {

	id: string = '';

	name: string;

	similar:number;

	className:string;

	grade:number;

	status:boolean;

	constructor(id: string, name?: string, similar?: number,className?:string,grade?:number,status?:boolean) {
   
        
        if (id) this.id = id;
        if (name) this.name = name;
        if (similar) this.similar = similar;
        if (className) this.className = className;
        if (grade) this.grade = grade;
        if (similar) this.status = status;
    }
}