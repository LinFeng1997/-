/**
 * Created by Blow on 2017-05-26.
 */
/*
 评论
 */
export class Comment {

    imageUrl: string;
    cName: string;
    cClass: string;
    cTime: any;
    cBody: any;
    constructor(imageUrl?: string, cName?: string, cClass?: string, cTime?: string, cBody?: string) {
        if (imageUrl) this.imageUrl = imageUrl;
        if (cName) this.cName = cName;
        if (cClass) this.cClass = cClass;
        if (cTime) this.cTime = cTime;
        if (cBody) this.cBody = cBody;
    }
}