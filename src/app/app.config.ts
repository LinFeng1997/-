/**
 * Created by Blow on 2017-03-06.
 */
import { Injectable } from '@angular/core';


declare let jQuery: any;

//@Injectable()
export class AppConfig {

    /**
     * 当前平台
     * IOS,Android
     */
    public static platform: string = "Android";
    // public static platform :string= "IOS";
    /**
     * 手机厂商
     */
    public static MobileManufacturer: string;
    /**
     * 手机型号
     */
    public static Mobileodel: string;

    /**
     * 启动时间
     */
    public static BeingTime: any;

    /**
     * 是否为调试模式
     */
    public static BuildingMessage = "当前功能尚未开放，敬请期待！";


    public static lastLocationName: string;

    /**
     * 是否为调试模式
     */
    public static debug = true;


    /**
     *
     */
    config = {
        /**
         * name
         */
        /**
         * title
         */
        title: '框架',

        /**
         * 真机调试时log TAG
         */
        logTAG: 'ionic:',

        logo: 'assets/img/logo.png',
        logoX1: 'assets/img/logo32.png',
        logoX2: 'assets/img/logo48.png',

        /**
         * 本机测试
         */
        //测试地址

        //正式地址
        webBaseUrl: "http://202.203.209.96/",
        //urp的token
        urpToken:"",
        /**
         * 设备Id每一台手机的唯一编码
         */
        deviceId: 'Browser',

        /**
         * App版本号(获取Manifest中的android:versionName)
         */
        version: '',

        /**
         * 百度推送ChannelId
         */
        baiduPushChannelId: '',

        /**
         * 是否需要第一次介绍导航
         */
        needFirstNav: false,

        /**
         * 默认导航索引
         */
        defaultTabIndex: 0,

        /**
         * Whether to print and alert some log information
         */
        //debug: true,

        /**
         * In-app constants
         */
        settings: {
            colors: {
                'white': '#fff',
                'black': '#000',
                'gray-light': '#999',
                'gray-lighter': '#eee',
                'gray': '#666',
                'gray-dark': '#343434',
                'gray-darker': '#222',
                'gray-semi-light': '#777',
                'gray-semi-lighter': '#ddd',
                'brand-primary': '#5d8fc2',
                'brand-success': '#64bd63',
                'brand-warning': '#f0b518',
                'brand-danger': '#dd5826',
                'brand-info': '#5dc4bf'
            },
            screens: {
                'xs-max': 543,
                'sm-min': 544,
                'sm-max': 767,
                'md-min': 768,
                'md-max': 991,
                'lg-min': 992,
                'lg-max': 1199,
                'xl-min': 1200
            },
            navCollapseTimeout: 2500
        },

        /**
         * Application state. May be changed when using.
         * Synced to Local Storage
         */
        state: {
            /**
             * whether navigation is static (prevent automatic collapsing)
             */
            'nav-static': false
        }
    };



    /**
     * 加载动画参数
     */
    static loadingParam = {
        /**
         * loading样式
         */
        spinner: ['ios', 'dots', 'bubbles', 'circles', 'crescent'],
        /**
         * 默认loading文字
         */
        msg: '载入中..',
        /**
         * 默认loading为不关闭
         */
        timeout: 0
    };

    /** 
     * 加载动画参数
    */
    static toastParam = {
        /**
         * 提示信息位置
         */
        position: {
            top: 'top',
            middle: 'middle',
            bottom: 'bottom'
        },
        /**
         * 默认关闭时间
         */
        duration: 3000,
        /**
         * 关闭按钮默认文字
         */
        clostBtnText: '关闭'
    };

    /**
     * Popover组件参数
     */
    static popParam = {
        showHeight: {
            /**
             * 高度60%
             */
            百分之六十: 'floatPop60',
            /**
             * 高度80%
             */
            百分之八十: 'floatPop'
        }
    };

    /**
     * 缓存键值
     */
    static cacheKeys = {

    };

    /**
     * Ionic 框架配置
     * @type {{backButtonText: string; iconMode: string; modalEnter: string; modalLeave: string; tabsPlacement: string; pageTransition: string}}
     */
    static ionicConfig = {
        backButtonText: '',
        mode: 'md',
        iconMode: 'md',
        pageTransition: 'md',
        modalEnter: 'modal-slide-in',
        modalLeave: 'modal-slide-out',
        tabsPlacement: 'bottom',
        tabsHideOnSubPages: true,
        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        monthShortNames: ['01月', '02月', '03月', '04月', '05月', '06月', '07月', '08月', '09月', '10月', '11月', '12月'],
        dayNames: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        dayShortNames: ['周天', '周一', '周二', '周三', '周四', '周五', '周六']
    };

    /**
     * PouchDB  配置文件
     * @type {{apiKey: string; authDomain: string; databaseURL: string; storageBucket: string}}
     */
    static PouchDBConfig = {
        dbName: 'ionic',
        authDomain: '',
        databaseURL: '',
        storageBucket: ''
    };


}
