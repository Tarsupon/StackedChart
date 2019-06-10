import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StackedChartComponent } from './stacked-chart/stacked-chart.component';
import {StackedChartServiceService} from "./stacked-chart/stacked-chart-service.service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    StackedChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [StackedChartServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
