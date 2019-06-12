import {MonthlyWorkloadBar} from "./MonthlyWorkloadBar";
import {ProjectsWorkloadBar} from "./ProjectsWorkloadBar";
import {Project} from "./Project";
import {stringify} from "querystring";
import {Data} from "@angular/router";
import {debug} from "util";

export class BarChartData {
  labels: string[] = [];
  datasets: DataSet[] = [];

  constructor(monthlyBars: MonthlyWorkloadBar[]) {
    const resultData = this.createDataset(monthlyBars);
    this.labels = resultData.labels;
    this.datasets = resultData.datasets;
  }

  private createDataset(monthlyBars: MonthlyWorkloadBar[]): {labels: string[], datasets: DataSet[]} {
    let labels: string[] = monthlyBars.map((data) => data.month);

    let monthNumber: number = 0;
    let datasets: DataSet[] = [];
    monthlyBars.map(data => {
      monthNumber++;

      data.projectsWorkloadBar.map((currentProject: Project) => {
        let projectsNumber: number = data.projectsWorkloadBar.length;
        let iterator: number = 0;
        let existedProject = datasets.find((project) => project.label === currentProject.name);

        datasets.forEach((set) =>{
          if (set.label !== currentProject.name) iterator++;
        });

        if (existedProject) {
          existedProject.data.push(currentProject.workload);
          return;
        }

        if (projectsNumber <= iterator) {
          const dataSet: DataSet = new DataSet(currentProject, monthNumber);
          datasets.push(dataSet);
        } else {
          const dataSet: DataSet = new DataSet(currentProject);
          datasets.push(dataSet);
        }
      })
    });
    return {labels, datasets};
  }
}

export class DataSet {
  label: string;
  backgroundColor: string;
  data: number[];

  constructor(project: Project, iterator?: number) {
    this.label = project.name;
    this.backgroundColor = project.color;
    if (iterator) {
      let arr: number[] = [];
      for (let i = 0; i < iterator - 1; i++) {
        arr.push(0);
      }
      arr.push(project.workload);
      this.data = arr;
    } else {
      this.data = [project.workload];
    }
  }
}
