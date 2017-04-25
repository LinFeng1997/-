import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import * as echarts from 'highcharts';

@Component({
	selector: 'page-contact',
	templateUrl: 'contact.html'
})
export class ContactPage {
	chart;
	isShow: boolean = false;
	testData: any = [{
		"课程名称": "离散数学",
		"总成绩": [87, 88, 81, 84, 60, 14, 86, 89, 70, 51, 67, 83, 80, 96, 60, 86, 86, 91, 87, 60, 88, 74, 86, 93, 93, 96, 91, 86, 87, 75, 78, 91, 81, 76, 83, 79, 75, 50, 64, 74, 88, 84, 87, 62, 64, 75, 80, 60, 72, 58, 60, 76, 60, 69, 62, 60, 71, 76, 60, 38, 68, 40, 71]
	}, {
		"课程名称": "专业实训(2)",
		"总成绩": [null, 71, 80, 71, 82, 100, 73, 84, 70, 71, 100, 83, 100, 95, 80, 100, 100, 94, 60, 60, 85, 100, null, 96, 80, 87, 93, 93, 82, 90, 85, 83, 91, 83, 65, 62, 61, 61, 65, 92, 89, 37, 89, 90, 35, 76]
	}, {
		"课程名称": "计算机科学技术史",
		"总成绩": [77, 81, 76, 80, 75, 73, 87, 77, 72, 83, 86, 60, 70, 66, 76, 72, 75, 68, 61, 45, 86, 88, 91, 84, 73, 84, 87, 84, 81, 60, 66, 27, 68, 60, 75, null, 60, 71, 43, 61, 77, 65, 70, 83, 70, 76, 66, 78, 75, 64, 66, 79, 55, 75, 88, 60, 75, 83, 80, 86, 50, 69, 60, 78, 63, 61, 74, 81, 86, 67, 60, 18, 60, 60, 60, 76, 61, 79, 81, 74, 83, 83, 70, 64, 64, 74, null, null, 67, 61, 64, 52, 76, 76, 80, 81, 60, 87, 74, 51, 90, 60, 78, 74, 81, 87, 88, 62, 40, 78, 86, 74, 60, 62, 51, 60, 80, 94, 91, 87, 67, 94, 60, 77, 79, 85, 66, 66, 61, 88, 74, 60, 77, 90, 46, 47, 83, 87, 45, 72, 69, 60, 19, 60, 30, 90, null, 83, null, 76, 79, 75, 83, 92, 92, null, 72, 85, null, 78, 92, null]
	}, {
		"课程名称": "数据库原理与实用技术",
		"总成绩": [63, 80, 60, 76, null, 87, 82, 86, 84, 50, 40, 14, 72, 74, 60, 89, 79, 75, 77, 90, 77, 75, 86, 93, 86, 82, 88, 81, 92, 88, 79, 70, 81, 61, 74, 73, 85, 69, 76, 83, 83, 82, 88, 87, 45, 70, 14, 70, 83, 84, 80, 77, 81, 81, 75, 60, 60, 92, 77, 80, 66, 72, 86, 90, 85, 70, 92, 93, 84, 20, 88, 80, 62, 86, 86, 88, 62, 92, 86, 90, 80, 95, 82, 86, 75, 90, 72]
	}, {
		"课程名称": "数据库原理与实用技术实验",
		"总成绩": [83, 79, 78, null, 86, 77, null, 81, 72, 77, 78, 83, 93, 91, 85, 79, 80, 85, 87, 86, 78, 81, 81, 78, 74, 79, 81, 75, 81, 81, 92, 88, 62, 63, 63, 85, 62, 81, 84, 80, 85, 82, 74, 83, 74]
	}, {
		"课程名称": "创新设计",
		"总成绩": [null, 98, 69, null, 98, 100, 93, 72, 90, 69, 72, 94, 100, 96, 61, 63, 69, 100, 94, 93, 93, 65, 65, 93, 93, 90, 67, 93, 62, 86, 93, 98, 67, 85, 72, 100, 85, 100]
	}];
	constructor(public navCtrl: NavController) {
	}

	get pageCount(): number {
        return 4;
    }

	ionViewDidEnter() {
		this.show();

	}
	show() {
		if (this.isShow) {
			this.showLineChart();
			this.showAreaChart();
			this.showPointChart(this.testData);
		}
		else{
			return;
		}
	}
	showLineChart() {
		this.chart = echarts.chart('container', {
			chart: {
				type: 'line',
				zoomType: 'xy'
			},
			title: {
				text: '张璇给分情况线图'
			},
			// 数据列配置
			plotOptions: {
				line: {
					marker: {
						enabled: false
					}
				}
			},
			credits: {
				enabled: false
			},
			xAxis: {
				// categories: ['1', '2', '3', '4', '5',
				// 	'6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16',
				// 	'17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36']
			},
			yAxis: {
				categories: [0, 20, 40, 60, 80, 100]
			},

			series: [{
				name: this.testData[0].课程名称,
				data: this.testData[0].总成绩,
			}, {
				name: this.testData[1].课程名称,
				data: this.testData[1].总成绩,
			}, {
				name: this.testData[2].课程名称,
				data: this.testData[2].总成绩,
			}, {
				name: this.testData[3].课程名称,
				data: this.testData[3].总成绩,
			}, {
				name: this.testData[4].课程名称,
				data: this.testData[4].总成绩,
			}, {
				name: this.testData[5].课程名称,
				data: this.testData[5].总成绩,
			}]
		});
	}
	showAreaChart() {
		this.chart = echarts.chart('area', {
			chart: {
				type: 'area'
			},
			title: {
				text: '美苏核武器库存量(面积图)'
			},
			subtitle: {
				text: '数据来源: <a href="https://thebulletin.metapress.com/content/c4120650912x74k7/fulltext.pdf">' +
				'thebulletin.metapress.com</a>'
			},
			xAxis: {
				allowDecimals: false,
				labels: {
					formatter: function() {
						return this.value; // clean, unformatted number for year
					}
				}
			},
			yAxis: {
				title: {
					text: '核武库国家'
				},
				labels: {
					formatter: function() {
						return this.value / 1000 + 'k';
					}
				}
			},
			tooltip: {
				pointFormat: '{series.name} 制造 <b>{point.y:,.0f}</b>枚弹头'
			},
			plotOptions: {
				area: {
					pointStart: 1940,
					marker: {
						enabled: false,
						symbol: 'circle',
						radius: 2,
						states: {
							hover: {
								enabled: true
							}
						}
					}
				}
			},
			series: [{
				name: '美国',
				data: [null, null, null, null, null, 6, 11, 32, 110, 235, 369, 640,
					1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,
					27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
					26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
					24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586,
					22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
					10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104]
			}, {
				name: '苏联/俄罗斯',
				data: [null, null, null, null, null, null, null, null, null, null,
					5, 25, 50, 120, 150, 200, 426, 660, 869, 1060, 1605, 2471, 3322,
					4238, 5221, 6129, 7089, 8339, 9399, 10538, 11643, 13092, 14478,
					15915, 17385, 19055, 21205, 23044, 25393, 27935, 30062, 32049,
					33952, 35804, 37431, 39197, 45000, 43000, 41000, 39000, 37000,
					35000, 33000, 31000, 29000, 27000, 25000, 24000, 23000, 22000,
					21000, 20000, 19000, 18000, 18000, 17000, 16000]
			}]
		});
	}

	showPointChart(data) {
		this.chart = echarts.chart('point', {
			chart: {
				type: 'scatter',
				zoomType: 'xy'
			},
			title: {
				text: '张璇离散成绩分布图（散点图）'
			},
			subtitle: {
				text: '数据来源:教务处'
			},
			xAxis: {
				// categories: [0, 20, 40, 60, 80,100],
				floor: 0,
				// ceiling: data.length,
				title: {
					enabled: true,
					text: '人次'
				},
				startOnTick: true,
				endOnTick: true,
				showLastLabel: true
			},
			yAxis: {
				categories: [0, 20, 40, 60, 80, 100],
				title: {
					text: '成绩'
				}
			},
			legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'top',
				x: 0,
				y: 30,
				floating: true,
				backgroundColor: '#FFFFFF',
				borderWidth: 1
			},
			plotOptions: {
				scatter: {
					marker: {
						radius: 5,
						states: {
							hover: {
								enabled: true,
								lineColor: 'rgb(100,100,100)'
							}
						}
					},
					states: {
						hover: {
							marker: {
								enabled: false
							}
						}
					},
					tooltip: {
						headerFormat: '<b>{series.name}</b><br>',
						pointFormat: '{point.y}分 '
					}
				}
			},
			series: [{
				name: data[5].课程名称,
				color: 'rgba(223, 83, 83, .5)',
				data: data[5].总成绩
			}, {
				name: data[1].课程名称,
				color: 'rgba(88, 83, 83, .5)',
				data: data[1].总成绩
			}],

		});
	}
}
