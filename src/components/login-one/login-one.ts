// import { FormBuilder, FormControl, Validator } from '@angular/forms';
import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { ModalController, LoadingController, ToastController, AlertController, App } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { UserService } from "../../providers/user.Service";
import { UserInfor } from "../../Entities/UserInfor";
import { AbstractComponent } from "../../interfaces/abstract-component";
import { AppConfig } from '../../app/app.config';

@Component({
  selector: 'login-component',
  templateUrl: 'login-one.html',
})
export class LoginComponent extends AbstractComponent implements OnInit {
  private loginBack: number = 0;
  public loginForm: any;
  // public backgroundImage = `./assets/images/login-back${this.loginBack}.png`;
  public backgroundImage = `./assets/images/login-back7.png`;
  username: string = "20141120083";
  password: string = "";
  validate: string = "";
  temp: string = "";
  urpValidateSrc: string = '';
  @Output() loginSuccess: EventEmitter<any> = new EventEmitter();
  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    protected loadingCtrl: LoadingController,
    protected toastCtrl: ToastController,
    private userSvc: UserService,
    protected cfg: AppConfig
  ) {
    super(cfg, navCtrl, toastCtrl, loadingCtrl);
  }
  ngOnInit() {
    // this.loadBackImg();
    this.loadLoginValidate();
    this.userSvc.loadUserData().subscribe(u => {
    })
    console.log('Hello Login Page');
  }

  loadLoginValidate(): void {
    this.userSvc.userUrpValidate().subscribe(
      (r: any) => {
        this.closeLoading();
        if (r == null) {
          this.showMessage('失败,服务器没传数据回来');
          return;
        }
        this.temp = r.TempGuid;
        this.urpValidateSrc = "http://202.203.209.96/vimgs/" + r.ImgGuid + ".png";
      },
      er => {
        this.closeLoading();
        this.showMessage('获取验证码失败');
      }
    );
    ;
  }

  urpLogin(): void {
    this.showLoading("正在登录urp...");
    this.userSvc.userUrpLogin(this.validate, this.temp, this.username, this.password).subscribe(
      (r: any) => {
        this.closeLoading();
        if (r == null) {
          this.showMessage('失败,服务器没传数据回来');
          return;
        }
        console.log(r);
        this.emitLogin(r);
        this.showMessage('成功');
      },
      er => {
        this.closeLoading();
        if (er.error_description) {
          this.showMessage(er.error_description);
        }
        else {
          this.showMessage(er.error);
        }
        console.log(er);
      }
    );
    ;
    this.loadLoginValidate();
  }
  sb():any{
        this.showMessage('就不告诉你！');
  }
  loadBackImg(): any {
    setInterval(() => {
      this.loginBack = (this.loginBack + 1) % 13;
      // this.backgroundImage = `assets/images/login-back${this.loginBack}.png`;
    }, 3000);
  }

  emitLogin(info:any): void {
        this.loginSuccess.emit(info);
        console.log(`事件发送成功${info}`);
        // console.log(info);
  }
}
