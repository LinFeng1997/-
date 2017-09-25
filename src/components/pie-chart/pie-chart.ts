import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, ToastController } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { AbstractComponent } from "../../interfaces/abstract-component";
import { AppConfig } from '../../app/app.config';
import { TeacherDetailsModel } from '../../entities/TeacherDetailsModel'
import { Comment } from '../../entities/Comment';
import { AboutService } from '../../providers/about.Service';
import * as echarts from 'highcharts';

declare let moment: any;

@Component({
  selector: 'pie-chart',
  templateUrl: 'pie-chart.html'
})
export class PieChartComponent extends AbstractComponent implements OnInit {

  chats: Array<Comment> = [];
  chart;
  comment: string;
  teacherItem: TeacherDetailsModel;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    protected loadingCtrl: LoadingController,
    protected toastCtrl: ToastController,
    protected aboutSvc: AboutService,
    protected cfg: AppConfig
  ) {
    super(cfg, navCtrl, toastCtrl, loadingCtrl);
    moment.locale('zh-cn');

  }
  ngOnInit() {
    this.teacherItem = this.navParams.get("teacher");
    this.showPieChart(this.teacherItem);
    this.getComment();
  }

  showPieChart(data) {
    this.chart = echarts.chart('chart', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false
      },
      title: {
        text: data.className + " " + data.teacherName + '\n' + "教学班代码:" + data.classId
      },
      subtitle:{
        text: "选课人数:" + data.studentCount        
      },
      tooltip: {
        headerFormat: '{series.name}<br>',
        pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        }
      },
      series: [{
        type: 'pie',
        name: '分数段分布',
        data: [
          ['高分率(90+)', data.goodCount],
          ['良好率', data.commonCount],
          {
            name: '挂科率(60-)',
            y: data.badCount,
            sliced: true,
            selected: true
          },
        ],
        colors: ['#ffc450', '#c8c7cc', '#e75a48']
      }]
    });
  }

  getComment() {
    this.aboutSvc.queryComment(this.teacherItem.classId)
      .subscribe(u => {
        this.chats = [];
        u.forEach(e => {
          let comment = new Comment('./assets/images/logo.png', e["评论人"], e['评论课程'], e['评论时间'], e['评论内容']);
          this.chats.push(comment);
        });
      }, err => {
        console.log(err);
        this.showMessage("出错了");
      });
  }

  submitComment() {
    this.aboutSvc.postComment(this.comment, this.teacherItem.classId)
      .subscribe(u => {
        this.showMessage("提交成功!");
        this.getComment();
        console.log(u);
      }, err => {
        console.log(err);
        this.showMessage("出错了");
      })
  }
  //Todo:防止内存泄露
  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

  }
}
