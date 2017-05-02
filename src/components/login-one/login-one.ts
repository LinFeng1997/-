/**
 * Modify by Blow on 2017-03-30.
 */
// import { FormBuilder, FormControl, Validator } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalController, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { UserService } from "../../providers/user.Service";
// import { UserInfor } from "../../Entities/UserInfor";
import { AbstractComponent } from "../../interfaces/abstract-component";
import { AppConfig } from '../../app/app.config';
import { AbstractService } from "../../interfaces/abstract-service";
import { ValidateCodeInputComponent} from '../components/validate-code-input/validate-code-input';

@Component({
  selector: 'login-component',
  templateUrl: 'login-one.html',
})
export class LoginComponent extends AbstractComponent implements OnInit {
  private loginBack: number = 0;
  public loginForm: any;
  // public backgroundImage = `./assets/images/login-back${this.loginBack}.png`;
  public backgroundImage = `./assets/images/login-back7.png`;
  username: string = "";
  password: string = "";
  validate: string = "";
  temp: string = "";
  urpValidateSrc: string = '';
  @Output() loginSuccess: EventEmitter<any> = new EventEmitter();
  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    protected loadingCtrl: LoadingController,
    protected toastCtrl: ToastController,
    protected alertCtrl: AlertController,
    private userSvc: UserService,
    protected cfg: AppConfig,
    private cacheService: AbstractService
  ) {
    super(cfg, navCtrl, toastCtrl, loadingCtrl,null,alertCtrl);
  }
  ngOnInit() {
    this.getCache();
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
        this.showMessage('登录成功！');
        //存储账号密码为缓存  
        this.addToCache(this.username, this.password);
        this.cfg.config.id = this.username;
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

  login():any{
    this.showPrompt('输入验证码',"","请输入下方验证码",(e)=>{this.validate = e});
  }
  sb(): any {
    // this.showMessage('就不告诉你！');
    this.navCtrl.push('ChooseCourse');
  }
  loadBackImg(): any {
    setInterval(() => {
      this.loginBack = (this.loginBack + 1) % 13;
      // this.backgroundImage = `assets/images/login-back${this.loginBack}.png`;
    }, 3000);
  }

  emitLogin(info: any): void {
    this.loginSuccess.emit(info);
    console.log(`事件发送成功${info}`);
    // console.log(info);
  }
  //将用户名和密码存储进缓存之中
  addToCache(username, password): any {
    let usernameCache = this.cfg.cacheKeys.user;
    this.cacheService.addCache(usernameCache,
      {
        username: username,
        password: password,
        token : this.cfg.config.urpToken
      });
  }
  //获取缓存,封装把用户名、密码、token封装进一个对象里
  getCache(): any {
    let cacheKey = this.cfg.cacheKeys.user;
    try {
      this.cacheService.getCacheAsync(cacheKey)
        .then(v => {
            this.username = v.username;
            this.password = v.password;
            this.cfg.config.urpToken = v.token;
            this.cfg.config.id = v.username;
        })
        .catch(er => {
          console.log("错误");
        });
    } catch (e) {
      console.log(`成绩有毒的缓存${cacheKey}获取失败!`);
    }
  }
}


