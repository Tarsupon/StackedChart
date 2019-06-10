export class BarChartData {
  labels: string[] = [];
  datasets: DataSet[] = [];
}

export class DataSet {
  label: string;
  backgroundColor: string;
  data: number[];
}
