import { Component, ViewChild, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { AbstractComponent } from "../../interfaces/abstract-component";
import { AppConfig } from '../../app/app.config';
@IonicPage()
@Component({
	selector: 'page-recommand-chat',
	templateUrl: 'recommand-chat.html',
})
export class RecommandChat extends AbstractComponent implements OnInit {
	user = {
		_id: '534b8e5aaa5e7afc1b23e69b',
		pic: './assets/images/logo.png',
		username: '成绩有毒',
	}

	toUser = {
		_id: '534b8fb2aa5e7afc1b23e69c',
		pic: './assets/images/wechat.jpg',
		username: '小明',
	};

	doneLoading = false;

	messages = [
		{
			_id: 0,
			date: new Date(),
			userId: this.user._id,
			username: this.user.username,
			pic: this.user.pic,
			text: '你好呀~'
		},
		{
			_id: 1,
			date: new Date(),
			userId: this.user._id,
			username: this.user.username,
			pic: this.user.pic,
			text: '少年,你渴望力量吗？'
		},
		{
			_id: 2,
			date: new Date(),
			userId: this.toUser._id,
			username: this.toUser.username,
			pic: this.toUser.pic,
			text: '你要给我介绍女朋友吗？'
		},
		{
			_id: 3,
			date: new Date(),
			userId: this.toUser._id,
			username: this.toUser.username,
			pic: this.toUser.pic,
			text: '可以的！你是学霸还是学渣？'
		},
		{
			_id: 4,
			date: new Date(),
			userId: this.user._id,
			username: this.user.username,
			pic: this.user.pic,
			text: '我是学渣!'
		},
		{
			_id: 5,
			date: new Date(),
			userId: this.user._id,
			username: this.user.username,
			pic: this.user.pic,
			text: '那就赐你一个学霸妹子吧!'
		},
		{
			_id: 6,
			date: new Date(),
			userId: this.toUser._id,
			username: this.toUser.username,
			pic: this.toUser.pic,
			text: '祝你学习愉快~'
		}
	]

	@ViewChild(Content) content: Content;

	public messageForm: any;
	chatBox: any;

	constructor(public navCtrl: NavController, public formBuilder: FormBuilder, protected cfg: AppConfig) {
		super(cfg, navCtrl);
		this.messageForm = formBuilder.group({
			message: new FormControl('')
		});
		this.chatBox = "";
	}

	ngOnInit() {
	}


	send(message) {
		if (message && message != "") {
			//this.messageService.sendMessage(chatId, message);

			let messageData =
				{
					toId: this.toUser._id,
					_id: 6,
					date: new Date(),
					userId: this.user._id,
					username: this.toUser.username,
					pic: this.toUser.pic,
					text: message
				}

			this.messages.push(messageData);
			this.scrollToBottom();

			setTimeout(() => {
				let replyData =
					{
						toId: this.toUser._id,
						_id: 6,
						date: new Date(),
						userId: this.toUser._id,
						username: this.toUser.username,
						pic: this.toUser.pic,
						text: "此功能还在开发中噢~"
					}
				this.messages.push(replyData);
				this.scrollToBottom();
			}, 1000);
		}
		this.chatBox = "";
	}

	scrollToBottom() {
		setTimeout(() => {
			this.content.scrollToBottom();
		}, 100);
	}


}
