/**
 * Modify by Blow on 2017-03-22.
 */
import { Injectable, Component, EventEmitter, Input } from '@angular/core';
import { AppConfig } from "../app/app.config";
// import { Toast } from 'ionic-native';
import { Toast } from '@ionic-native/toast';
import {
    AlertController, Alert, ToastController, NavController, LoadingController, Loading, ModalController, Modal,
    PopoverController, Popover, ActionSheetController, NavParams
} from "ionic-angular";

declare let cordova: any;

//lodash
declare let _: any;

//jquery
declare let $: any;

/*
 抽象服务，包含了基本的服务方法定义
 Modified by Blow on 2017-03-06
 */
@Injectable()
export class AbstractComponent {

    //#region 基本属性
    /**
     * Loading动画
     */
    private _loader: Loading;

    /**
     * 标题
     */
    @Input() title: string;
    /**
     * 返回按钮
     */
    @Input() backText: string;

    /**
     * 确定按钮
     */
    @Input() okText: string;

    /**
     * 父组件
     */
    protected parentComponent: AbstractComponent;


    /**
     * 由需要此事件的子类实例化该事件，减少内存开销
     * 需要刷新
     * @type {EventEmitter<any>}
     */
    needRefresh: EventEmitter<any>;

    //#endregion

    //
    constructor(protected cfg: AppConfig, protected navCtrl?: NavController,
        protected toastCtrl?: ToastController,
        protected loadingCtrl?: LoadingController,
        protected modalCtrl?: ModalController,
        protected alertCtrl?: AlertController,
        protected popCtrl?: PopoverController,
        protected actionCtrl?: ActionSheetController,
        protected navParams?: NavParams,
        public devToast?: Toast) {
        if (AppConfig.debug)
            console.log(`${cfg.config.logTAG}ctox Abstract Component Provider`);
        //参数提取，标题，返回按钮，确定按钮
        if (navParams != null) {
            //
            let pp = navParams.get('title');
            if (pp == null)
                this.title = pp;//

            //
            pp = navParams.get('backText');
            if (pp == null)
                this.backText = pp;//

            //
            pp = navParams.get('okText');
            if (pp == null)
                this.okText = pp;//
        }


    }

    //#region 显示信息窗口

    /**
     * 显示上滑列表
     * @param title 列表标题
     * @param items 列表数组
     * @param act 列表方法
     * @param cancleAct 关闭行为
     */
    showActionSheet(title: string, items: string[], act: (s: string) => void, cancleAct?: () => void) {

        let bts = [];

        //
        _.forEach(items, (i) => {

            let btn = {
                text: i,

                handler: () => {
                    act(i)
                }
            };
            bts.push(btn);
        });

        bts.push({
            text: '取消',
            role: 'cancel',
            handler: cancleAct
        });


        //
        let actionSheet = this.actionCtrl.create({
            title: title,
            buttons: bts
        });

        actionSheet.present();
    }

    /**
     * 显示普通提示框
     * @param msg 提示内容
     * @param position 位置 AppConfig.toastParam.position 默认底部
     * @param timeout 关闭时间，默认3000
     * @param showCloseButton 是否显示关闭按钮 默认否
     * @param clostBtnText 关闭按钮文字
     */
    showMessage(msg: string, position?: string, timeout?: number, showCloseButton?: boolean, clostBtnText?: string) {

        if (!showCloseButton) {
            showCloseButton = false;
            if (!timeout) timeout = AppConfig.toastParam.duration;
        } else {
            if (showCloseButton)
                timeout = 0;
            else if (!timeout) timeout = AppConfig.toastParam.duration;
        }

        if (!clostBtnText) clostBtnText = AppConfig.toastParam.clostBtnText;

        //
        if (!position) position = AppConfig.toastParam.position.bottom;

        let showT = () => {
            //
            let toast = this.toastCtrl.create({
                message: msg,
                duration: timeout,
                showCloseButton: showCloseButton,
                closeButtonText: clostBtnText,
                position: position
            });

            //
            toast.present();
        };

        if (showCloseButton) {
            showT();
        } else {
            if (this.cfg.config.deviceId === "Browser") {
                showT();
            } else {

                //在真机上，用更好看的toast
                if (position === AppConfig.toastParam.position.middle)
                    position = 'center';

                this.devToast.show(msg, timeout.toString(), position)
                    .subscribe(
                    toast => {
                        if (AppConfig.debug)
                            console.log(`${this.cfg.config.logTAG}真机Toast:${toast}`);
                    }
                    );
            }
        }
    }

    /**
     * 显示弹出模态框
     * @param content    组件
     * @param params     传递的参数
     * @param opts    其他参数
     */
    showModal(content: Component, params?: any, opts?: any): Modal {

        if (params == null)
            params = {};

        if (opts == null)
            opts = {
                enableBackdropDismiss: true,
                showBackdrop: true
            };

        let modal = this.modalCtrl.create(content, params, opts);

        //
        modal.present();

        return modal;
    }

    /**
     * 显示弹出Popover
     * @param content    组件
     * @param params    传递的参数
     * @param showHeight AppConfig.popParam.showHeight    黑框大小
     */
    showPopover(content: Component, params?: any, showHeight: string = AppConfig.popParam.showHeight.百分之六十): Popover {

        if (params == null)
            params = {};

        let opts = {
            cssClass: showHeight,
            enableBackdropDismiss: true,
            showBackdrop: true
        };

        let pop = this.popCtrl.create(content, params, opts);

        //
        pop.present();

        return pop;
    }

    /**
     * 显示载入动画
     * @param msg 提示文字，可以有html标签
     * @param timeout 关闭时间 默认不关闭
     * @param showBackdrop 是否显示背景 默认否
     * @param spinner loading图标 AppConfig.loadingParam.spinner[0|1|2|3|4] 默认随机
     */
    showLoading(msg?: string, timeout?: number, showBackdrop?: boolean, spinner?: string) {

        if (!msg) msg = AppConfig.loadingParam.msg;

        if (!timeout) {
            if (timeout !== 0)
                timeout = AppConfig.loadingParam.timeout;
        }

        if (!showBackdrop) {
            showBackdrop = false;
        }

        if (!spinner) spinner = AppConfig.loadingParam.spinner[new Number(Math.random() * 4).toFixed(0)];

        this.closeLoading();//先关闭已有的载入框


        //减低显示效果
        if (!this.needDemotionEffect()) {
            this._loader = this.loadingCtrl.create({
                spinner: spinner,
                content: msg,
                duration: timeout,
                showBackdrop: showBackdrop
            });
            this._loader.present();
        }

    }

    /**
     * 关闭所有载入动画
     */
    closeLoading() {

        //尝试释放已存的loading面板
        if (this._loader != null)
            this._loader.dismissAll();

        this._loader = null;
    }

    /**
     * 显示警告框或者半弹框
     * @param description 内容
     * @param title 标题
     * @param 按钮文字 默认：确定
     */
    showAlert(description: string, title?: string, buttonText?: string) {

        if (description == null) {
            description = '敬请期待!';
            return;
        }

        if (title == null)
            title = '';
        if (buttonText == null || buttonText == '')
            buttonText = '确定';


        let alert = this.alertCtrl.create({
            title: title,
            subTitle: description,
            buttons: [buttonText]
        });


        alert.present();
    }

    /**
     * 显示确认提示框
     * @param title 标题
     * @param description 内容
     * @param callBack 回调函数
     * @param okBtnText 确认按钮文字，默认确定
     * @param cancelBtnText 取消按钮文字，默认取消
     */
    confirm(title: string, description: string, callBack?: (res: boolean) => void, okBtnText: string = '确定', cancelBtnText: string = '取消'): Alert {
        let alert = this.alertCtrl.create({
            title: title,
            message: description,
            buttons: [
                {
                    text: cancelBtnText,
                    role: 'cancel',
                    handler: () => {
                        callBack(false);
                    }
                },
                {
                    text: okBtnText,
                    handler: () => {
                        callBack(true);
                    }
                }
            ],
            enableBackdropDismiss: false
        });

        alert.present();

        return alert;
    }


    showPrompt(title: string, description: string, placeholder: string, callBack: (res: any) => void, okBtnText: string = '确定', cancelBtnText: string = '取消'): Alert {
        let prompt = this.alertCtrl.create({
            title: title,
            message: description,
            inputs: [
                {
                    name: 'title',
                    placeholder: placeholder
                },
            ],
            buttons: [
                {
                    text: cancelBtnText,
                    role: 'cancel',
                    handler: () => {
                        // callBack(false);
                    }
                },
                {
                    text: okBtnText,
                    handler: () => {
                        console.log(prompt.data.inputs[0].value);
                        callBack(prompt.data.inputs[0].value);
                    }
                }
            ]
        });
        prompt.present();
        return prompt;

    }
    //#endregion

    //#region 视图辅助

    /**
     * 是否需要减低特性登记，对魅族特殊对待
     * @returns {boolean}
     */
    needDemotionEffect(): boolean {
        if (AppConfig.MobileManufacturer == "Meizu")
            return true;
        else
            return false;
    }


    /**
     * 创建一个指定大小的迭代数组
     * @param num
     * @returns {number[]}
     */
    protected createRange(num: number) {
        var items: number[] = [];

        for (var i = 1; i <= num; i++) {
            items.push(i);
        }
        return items;
    }

    /**
     * //Info:这里可能需要替换成angular的动画模块
     * 为指定元素播放, animate动画
     * @param element
     * @param action
     */
    playAnimate(elementId: string, action: string): void {
        if (elementId == null || action == null)
            return;

        //
        $(`#${elementId}`).removeClass()
            .addClass(`animated ${action}`)
            .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                $(this).removeClass();
            });
    }

    //#endregion

    /**
     * 打开外部链接
     * @param title 标题
     * @param url 链接地址
     */
    openExternalUrl(title: string, url: string): void {
        cordova.ThemeableBrowser.open(url, '_blank', {
            statusbar: {
                color: '#ffffffff'
            },
            toolbar: {
                height: 44,
                color: '#f0f0f0ff'
            },
            title: {
                color: '#003264ff',
                showPageTitle: true
            },
            closeButton: {
                wwwimage: './assets/images/logo.png',
                wwwimagePressed: 'close_pressed',
                wwwImageDensity: 2,
                align: 'left',
                event: 'closePressed'
            },
            backButtonCanClose: true
        }).addEventListener('backPressed', (e) => {
            this.showMessage('back pressed');
        }).addEventListener('helloPressed', (e) => {
            this.showMessage('hello pressed');
        }).addEventListener('sharePressed', (e) => {
            this.showMessage(e.url);
        }).addEventListener(cordova.ThemeableBrowser.EVT_ERR, (e) => {
            this.showMessage(JSON.stringify(e),null,100000);
            // this.showMessage('打开外部链接出错~');
        }).addEventListener(cordova.ThemeableBrowser.EVT_WRN, (e) => {
            if (AppConfig.debug)
                console.log(`${this.cfg.config.logTAG}发现警告信息:${e}`);
        });
      
    }


    //#region 权限相关

    /**
     * 是否需要显示登录
     */
    needLogin(): boolean {

        // //
        // if (AppConfig.currentUser == null || !AppConfig.currentUser.isLogined)
        //     return true;

        return false;
    }

    /**
     * 是否需要显示登录
     */
    needShowLogin(loginPage: any): boolean {

        // //
        // if (AppConfig.currentUser != null && AppConfig.currentUser.isLogined)
        //     return false;

        if (loginPage != null)
            this.showModal(loginPage);

        return true;
    }

    //#endregion


}
