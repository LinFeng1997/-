import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import 'rxjs/observable';
// import {Observable} from "rxjs";
import * as Rx from 'rxjs/Rx';
import { AppConfig } from "../../app/app.config";
import * as io from 'socket.io-client';

/*
 socket数据服务
 * Created by Blow on 2017-06-01
 */
@Injectable()
export class SocketService {
    socket: any;
    constructor(protected cfg: AppConfig) {
        this.socket = io('http://139.199.59.47:8000');
        if (AppConfig.debug)
            console.log(`${cfg.config.logTAG}ctox SocketService Provider`);
    }
    emit(event, data) {
        if (Array.isArray(data)) {
            this.socket.emit(event, ...data);
        }
        else {
            this.socket.emit(event, data);
        }
    }
    on(event, callback) {
        this.socket.on(event, callback);
    }

}
