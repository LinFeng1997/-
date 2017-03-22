/**
 * Created by Blow on 2017-03-06.
 */
/*
 urp用户
 */
export class UrpInfo {


	access_token:string = '';

	token_type:string;

	expires_in:number;

	refresh_token:string;

	userData:any;


	constructor(access_token?: string, userData?:any) {
           
        if (access_token) this.access_token = access_token;
        if (userData) this.userData = userData;
        
    }
}