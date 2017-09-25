import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, ToastController, ViewController, AlertController } from 'ionic-angular';
import { NavController, InfiniteScroll } from 'ionic-angular';
import { AbstractComponent } from "../../interfaces/abstract-component";
import { AppConfig } from '../../app/app.config';
import { RecommendationService } from '../../providers/recommendation.Service';

@Component({
  selector: 'page-recommand-p2p',
  templateUrl: 'recommand-p2p.html'
})
export class RecommandP2pPage extends AbstractComponent implements OnInit {
  // @Input() listType: string;
  recommandPerson: Array<any>;
  tmp: Array<any>;
  count: number = 10;

  constructor(public viewCtrl: ViewController, public navCtrl: NavController,
    public modalCtrl: ModalController,
    protected loadingCtrl: LoadingController,
    protected toastCtrl: ToastController,
    protected alertCtrl: AlertController,
    protected recSvc: RecommendationService,
    protected cfg: AppConfig,
  ) {
    super(cfg, navCtrl, toastCtrl, loadingCtrl);
  }
  ngOnInit() {
    this.showRadio('请选择你的CP属性', ['抱学霸大腿', '寻找有缘人双修'],
      data => this.recommendPerson(data)
    );
  }

  recommendPerson(data): any {
    let url = "";
    this.showLoading('正在寻找你的CP');
    if (data === '抱学霸大腿') {
      url = 'personUp';
    }
    else if (data === '寻找有缘人双修') {
      url = 'person';
    }
    else {
      return;
    }
    this.recSvc.queryRecommendation(url).subscribe(u => {
      this.tmp = u;
      this.recommandPerson = this.tmp.slice(0, this.count);
      this.closeLoading();
    }, er => {
      this.closeLoading();
      if (er.status === 500) {
        this.showMessage("请检查你的输入");
        return;
      }
      else if (er.status === 401) {
        this.showMessage(er.message);
        this.navCtrl.push('TokenValidate');
        return;
      }
      else {
        this.showMessage(er.message);
      }
    });
    // 异步          
  }

  trackByPerson(index: number, person: any): number {
    return person['姓名'];
  }

  chat(item) {
    //Todo:辣鸡数据库,没学号
    this.navCtrl.push('RecommandChat', { id: item['姓名'], name: item['姓名'] });
  }

  // 用户手动加载数据
  doInfinite(infiniteScroll: InfiniteScroll) {
    if (this.count<this.tmp.length){
      this.recommandPerson.push(this.tmp.slice(this.count, this.count + 1)[0]);
      infiniteScroll.complete();
      this.count++;
    }
  }
}
