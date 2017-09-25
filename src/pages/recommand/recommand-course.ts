import { Component, OnInit } from '@angular/core';
import { NavController,InfiniteScroll,ToastController } from 'ionic-angular';
import { AbstractComponent } from "../../interfaces/abstract-component";
import { AppConfig } from '../../app/app.config';
import { RecommendationService } from '../../providers/recommendation.Service';


@Component({
  selector: 'page-recommand-course',
  templateUrl: 'recommand-course.html',
})
export class RecommandCourse extends AbstractComponent implements OnInit {
  recommendCourse:any;
  constructor(public navCtrl: NavController,
    protected toastCtrl:ToastController,
    protected recSvc: RecommendationService,
    protected cfg: AppConfig,
  ) {
    super(cfg, navCtrl);
  }
  ngOnInit() {
    this.recSvc.queryRecommendation('course').subscribe(u=>{
      this.recommendCourse = u;
    },er=>{
      if (er.status === 500) {
				this.showMessage("请检查你的输入");
				return;
			}
			else if(er.status === 401){
				this.showMessage(er.message);
				this.navCtrl.push('TokenValidate');
				return;
			}
      this.showMessage(er.message);
    });
  }

}
