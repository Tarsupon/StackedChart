import {Component, Input, OnInit} from '@angular/core';
import * as Chart from 'chart.js';
import {MonthlyWorkloadBar} from "../models/MonthlyWorkloadBar";
import {StackedChartServiceService} from "./stacked-chart-service.service";
import {BarChartData, DataSet} from "../models/BarChartData";
import {Project} from "../models/Project";
import {ProjectsWorkloadBar} from "../models/ProjectsWorkloadBar";

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

  //   {
  //   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  //   datasets: [{
  //     label: 'Skype',
  //     backgroundColor: 'rgb(255,86,53)',
  //     data: [5, 3, 4, 7, 2, 1, 2]
  //   }, {
  //     label: 'Word',
  //     backgroundColor: 'rgb(253,68,255)',
  //     data: [2, 1, 3, 2, 4, 5, 2]
  //   }, {
  //     label: 'LinkedIn',
  //     backgroundColor: 'rgb(24,113,255)',
  //     data: [3, 2, 4, 1, 3, 2, 1]
  //   }]
  //
  // };

  monthlyWorkloadBars: MonthlyWorkloadBar[] = [];
  private resultDataset: BarChartData;

  private createDataset() {
    this.monthlyWorkloadBars.forEach((data) => {
      for (let i = 0; i <= this.monthlyWorkloadBars.length; i++) {
        this.resultDataset.labels.push(data[i].month);
        console.log(this.resultDataset.labels);
      }
    });
    this.monthlyWorkloadBars.map( data =>{
      data.projectsWorkloadBar.map( (set: ProjectsWorkloadBar) =>{
        set.projectsWorkloadBar.map((project: Project) => {
          const dataSet: DataSet = new DataSet();
          dataSet.label = project.name;
          dataSet.backgroundColor = project.color;
          dataSet.data.push(project.workload);

          this.resultDataset.datasets.push(dataSet);
        })
      })
    });
  }
  // labels: string[] = [];
  // datasets: DataSet[] = [];
  // projects: Project[] = [];
  // names: string[] = [];

  constructor(private stackedChartService: StackedChartServiceService) {}

  ngOnInit() {
    this.stackedChartService.getData().subscribe((data : MonthlyWorkloadBar)  => this.monthlyWorkloadBars.push(data));

    // this.stackedChartService.getData().subscribe((data: MonthlyWorkloadBar) =>{
    //   for (let i = 0; i <= this.monthlyWorkloadBars.length; i++) {
    //     this.labels.push(data[i].month);
    //
    //     data[i].projectsWorkloadBar.forEach( (project: Project) => {
    //       for (let j = 0; j <= data[i].projectsWorkloadBar.length; j++) {
    //         this.names.push(project[j].name);
    //       }
    //     });
    //     console.log(this.names)
    //   }
    //   this.barChartData.labels = this.labels;
    // });

    this.chart = new Chart('canvas', {
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

}
