import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, ToastController } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { AbstractComponent } from "../../interfaces/abstract-component";
import { AppConfig } from '../../app/app.config';
import { TeacherDetailsModel } from '../../entities/TeacherDetailsModel'
import * as echarts from 'highcharts';

declare let moment:any;

@Component({
  selector: 'pie-chart',
  templateUrl: 'pie-chart.html'
})
export class PieChartComponent extends AbstractComponent implements OnInit {

  chats = [{
    imageUrl: 'assets/images/tx3.jpg',
    title: '软件学院某同学',
    lastMessage: '老师很好',
    timestamp: moment().format('LLL')
  },
  {
    imageUrl: 'assets/images/tx4.jpg',
    title: '新闻学院某同学',
    lastMessage: '老师非常好',
    timestamp: moment().format('LLL')
  }
    , {
    imageUrl: 'assets/images/tx5.jpg',
    title: '物天学院某同学',
    lastMessage: '挂科是自找的',
    timestamp: moment().format('LLL')
  }]
  chart;
  teacherItem:TeacherDetailsModel;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    protected loadingCtrl: LoadingController,
    protected toastCtrl: ToastController,
    protected cfg: AppConfig
  ) {
    super(cfg, navCtrl, toastCtrl, loadingCtrl);
    moment.locale('zh-cn');
    
  }
  ngOnInit() {
    this.teacherItem = this.navParams.get("teacher");

    this.showPieChart(this.teacherItem);
  }

  showPieChart(data) {
    // let name;
    // if (!index) {
    //   name = 'test';
    // }
    // else {
    //   name = 'chart' + index;
    // }
    this.chart = echarts.chart('chart', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false
      },
      title: {
        text: data.className+" "+data.teacherName+'\n'+"教学班代码:"+data.classId
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
}
