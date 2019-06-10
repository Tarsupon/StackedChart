import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BarChartData} from "../models/BarChartData";
import {MonthlyWorkloadBar} from "../models/MonthlyWorkloadBar";
import {forEach} from "@angular/router/src/utils/collection";

@Injectable({
  providedIn: 'root'
})
export class StackedChartServiceService {
  private URL: string = 'http://localhost:3000/monthlyWorkloadBar';
  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(this.URL);
  }
}
