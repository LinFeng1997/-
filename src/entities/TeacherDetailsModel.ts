export class TeacherDetailsModel{
    //教学班代码
    classId;
    // 课程名称
    className;
    // 讲授教师姓名
    teacherName;
    // 上课人数
    studentCount;
    // 平均分
    avg;
    // 60以下
    badCount;
    // 60-90
    commonCount;
    // 90以上
    goodCount;

    constructor(classId?,className?,teacherName?,studentCount?,avg?,badCount?,commonCount?,goodCount?){
        this.classId = classId;
        this.className = className;
        this.teacherName = teacherName;
        this.studentCount = studentCount;
        this.avg = avg;
        this.badCount = badCount;
        this.commonCount = commonCount;
        this.goodCount = goodCount;
    }
}