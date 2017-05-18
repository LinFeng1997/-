/**
 * Created by Blow on 2017-04-01.
 */
import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController, ToastController, ViewController } from 'ionic-angular';
import { NavController,InfiniteScroll } from 'ionic-angular';
import { AbstractComponent } from "../../interfaces/abstract-component";
import { AppConfig } from '../../app/app.config';
import { InfoService } from '../../providers/info.Service';

@Component({
  selector: 'item-list',
  templateUrl: 'item-list.html'
})
export class ItemListComponent extends AbstractComponent implements OnInit {
  @Input() listType: string;
  itemList: any;
  tmpItemList: any;
  // 用户每次手动加载的数量
  count: any = 20;
  constructor(public viewCtrl: ViewController, public navCtrl: NavController,
    public modalCtrl: ModalController,
    protected loadingCtrl: LoadingController,
    protected toastCtrl: ToastController,
    protected cfg: AppConfig,
    protected infoSvc: InfoService
  ) {
    super(cfg, navCtrl, toastCtrl, loadingCtrl);
  }
  ngOnInit() {
    try {
      if (this.listType === '课程') {
        this.tmpItemList = this.infoSvc.queryCourseList();
      }
      else if (this.listType === '老师') {
        this.tmpItemList = this.infoSvc.queryTeacherList();
      }
      this.itemList = this.tmpItemList.slice(0, 20);
    } catch (e) {
      throw e;
    }
  }
  selectItem(item) {
    this.viewCtrl.dismiss(item);
  }

  filterItems(ev) {
    let val = ev.target.value;
    if (val && val.trim() !== '') {
      this.itemList = this.tmpItemList.filter((e) => {
        return e.includes(val);
      })

    }
  }
  // 用户手动加载数据
  doInfinite(infiniteScroll: InfiniteScroll) {
    this.itemList.push(this.tmpItemList.slice(this.count, this.count + 1));
    infiniteScroll.complete();
    this.count++;
    // this.infoSvc.getAsyncitemData().then((newData) => {
    // this.itemList = this.tmpitemList;
    // infiniteScroll.complete();
    //   // if (this.items.length > 90) {
    //   //   infiniteScroll.enable(false);
    //   // }
    // });
  }
}
