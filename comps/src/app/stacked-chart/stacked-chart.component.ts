import {Component, Input, OnInit} from '@angular/core';
import * as Chart from 'chart.js';
import {MonthlyWorkloadBar} from "../models/MonthlyWorkloadBar";
import {StackedChartServiceService} from "./stacked-chart-service.service";
// import {BarChartData, DataSet} from "../models/BarChartData";
import {Project} from "../models/Project";
import {ProjectsWorkloadBar} from "../models/ProjectsWorkloadBar";
import {filter} from "rxjs/operators";
import {BarChartData} from "../models/BarChartData";

@Component({
  selector: 'app-stacked-chart',
  templateUrl: './stacked-chart.component.html',
  styleUrls: ['./stacked-chart.component.css']
})
export class StackedChartComponent implements OnInit {

  private STACKED_BAR_CHART: string = 'bar';
  private CHART_NAME_POSITION: string = 'top';
  private BODY_FONT_FAMILY: string = 'Poppins';
  private BACKGROUND_TOOLTIP_COLOR: string = 'rgba(255,255,255,0.8)';
  private FONT_TOOLTIP_COLOR: string = 'rgba(0,0,0,0.8)';
  private BODY_TOOLTIP_COLOR: string = 'rgba(0,0,0,0.8)';
  private Y_AXES_NAME: string = 'Hours';
  private TOOLTIP_MODE: string = 'point';

  private chart: Chart;
  private chartName: string = 'testName';

  monthlyWorkloadBars: MonthlyWorkloadBar[] = [];
  private resultDataset: BarChartData;

  private createChartName(monthlyBars: MonthlyWorkloadBar[]): string {
    let labels: string[] = monthlyBars.map((data) => data.month);
    return `${labels[0]} - ${labels[labels.length - 1]}`;
  }

  private createNewChart(): Chart {
    return new Chart('canvas', {
      type: this.STACKED_BAR_CHART,
      data: this.resultDataset,
      options: {
        title: {
          display: true,
          position: this.CHART_NAME_POSITION,
          text: this.chartName
        },
        legend: {
          display: false,
        },
        tooltips: {
          mode: this.TOOLTIP_MODE,
          backgroundColor: this.BACKGROUND_TOOLTIP_COLOR,
          titleFontColor: this.FONT_TOOLTIP_COLOR,
          bodyFontColor: this.BODY_TOOLTIP_COLOR,
          bodyFontFamily: this.BODY_FONT_FAMILY,
          intersect: false
        },
        responsive: true,
        scales: {
          xAxes: [{
            stacked: true,
            gridLines: {
              display: false,
              drawBorder: false,
            }
          }],
          yAxes: [{
            stacked: true,
            scaleLabel:{
              display: true,
              labelString: this.Y_AXES_NAME,
            },
            gridLines: {
              borderDash: [8, 4],
              drawBorder: false,
            },
          }]
        }
      }
    });
  }

  constructor(private stackedChartService: StackedChartServiceService) {}

  ngOnInit() {
    this.stackedChartService.getData().pipe( filter(data => !!data)).subscribe((data : MonthlyWorkloadBar[])  => {
      this.monthlyWorkloadBars = data;
      this.resultDataset = new BarChartData(this.monthlyWorkloadBars);
      this.chartName = this.createChartName(this.monthlyWorkloadBars);
      this.chart = this.createNewChart();
    });
  }
}
