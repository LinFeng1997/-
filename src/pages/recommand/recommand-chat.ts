import { Component, ViewChild, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { IonicPage, NavController, NavParams, Content,AlertController, ToastController } from 'ionic-angular';
import { AbstractComponent } from "../../interfaces/abstract-component";
import { AppConfig } from '../../app/app.config';

import { SocketService } from "../../providers/datas/socket.Service";

@IonicPage()
@Component({
	selector: 'page-recommand-chat',
	templateUrl: 'recommand-chat.html',
})
export class RecommandChat extends AbstractComponent implements OnInit {
	chatCount: number = 0;
	user = {
		_id: this.cfg.config.id,
		pic: './assets/images/logo.png',
		username: '我',
	}

	toUser = {
		_id: this.navParams.get('id') || "test",
		pic: './assets/images/wechat.jpg',
		username: this.navParams.get('name') || '测试',
	};

	doneLoading = false;

	messages = [
		{
			_id: this.chatCount++,
			date: new Date(),
			userId: this.user._id,
			username: this.user.username,
			pic: this.user.pic,
			text: '这是聊天界面~'
		},
		{
			_id: this.chatCount++,
			date: new Date(),
			userId: this.toUser._id,
			username: this.toUser.username,
			pic: this.toUser.pic,
			text: '一起约学习吗？'
		}
	]

	@ViewChild(Content) content: Content;

	public messageForm: any;
	chatBox: any;

	constructor(public navCtrl: NavController, protected navParams: NavParams, 
	public formBuilder: FormBuilder, 
	protected toastCtrl: ToastController,
	protected cfg: AppConfig, 
	private socket: SocketService) {
		super(cfg, navCtrl);
		this.messageForm = formBuilder.group({
			message: new FormControl('')
		});
		this.chatBox = "";
	}

	ngOnInit() {
		this.getSocket();
		this.socket.emit('addUser', this.user._id);
		this.receiveMsg();
	}


	send(message) {
		if (message && message != "") {
			//this.messageService.sendMessage(chatId, message);
			this.sendToSokect();
			let messageData =
				{
					toId: this.toUser._id,
					_id: this.chatCount++,
					date: new Date(),
					userId: this.user._id,
					username: this.toUser.username,
					pic: this.toUser.pic,
					text: message
				}

			this.messages.push(messageData);
			this.scrollToBottom();
			console.log(this.messages);
			// setTimeout(() => {
			// 	let replyData =
			// 		{
			// 			toId: this.toUser._id,
			// 			_id: 6,
			// 			date: new Date(),
			// 			userId: this.toUser._id,
			// 			username: this.toUser.username,
			// 			pic: this.toUser.pic,
			// 			text: "此功能还在开发中噢~"
			// 		}
			// 	this.messages.push(replyData);
			// 	this.scrollToBottom();
			// }, 1000);
		}
		this.chatBox = "";
	}

	scrollToBottom() {
		setTimeout(() => {
			this.content.scrollToBottom();
		}, 100);
	}

	getSocket() {
		this.socket.on('open', function () {
			console.log('已连接')
		})
	}

	sendToSokect() {
		//Todo:错误处理
		let msg = { toUser: this.toUser._id, fromUser: this.user._id, msg: this.chatBox, time: Date.now() };
		this.socket.emit('sendMsg', msg);
		this.showMessage("发送完毕");
	}

	receiveMsg() {
		this.socket.on('to' + this.user, (obj) => {
			console.log('CHAT.msgArr', obj)
			let messageData =
				{
					toId: obj.toUser,
					_id: this.chatCount++,
					date: obj.time,
					userId: obj.fromUser,
					username: obj.toUser,
					pic: this.toUser.pic,
					text: obj.msg
				}
			this.messages.push(messageData);
			this.scrollToBottom();
		})
	}

	ngOnDestroy() {
		//Called once, before the instance is destroyed.
		//Add 'implements OnDestroy' to the class.
		this.socket.emit('disconnect', () => {

		});
	}

}
