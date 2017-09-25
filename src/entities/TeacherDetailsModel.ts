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
    // 最高分
    max;
    // 最低分
    min;
    // 方差
    dif;
    // 60以下
    badCount;
    // 60-90
    commonCount;
    // 90以上
    goodCount;

    constructor(classId?,className?,teacherName?,studentCount?,avg?,max?,min?,dif?,badCount?,commonCount?,goodCount?){
        this.classId = classId;
        this.className = className;
        this.teacherName = teacherName;
        this.studentCount = studentCount;
        this.avg = avg;
        this.max = max;
        this.min = min;
        this.dif = dif;
        this.badCount = badCount;
        this.commonCount = commonCount;
        this.goodCount = goodCount;
    }
}