import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

//Material Modules 
import { MaterialModule } from './material/material.module'
import { MatListModule } from '@angular/material/list'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatNativeDateModule } from '@angular/material/core'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatTableModule } from '@angular/material/table'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component'
import { ChartComponent } from './chart/chart.component'
import { Error404Component } from './error404/error404.component'
import { NewsComponent } from './news/news.component'
import { AboutComponent } from './about/about.component'
import { CoinlistComponent } from './coinlist/coinlist.component'
import { MatTabsModule } from '@angular/material/tabs'
import { HighchartsChartComponent } from 'highcharts-angular'

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    Error404Component,
    NewsComponent,
    AboutComponent,
    CoinlistComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatListModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    FormsModule,
    // HighchartsChartComponent,
    RouterModule.forRoot([
      { path: 'chart', component: ChartComponent },
      { path: 'coinlist', component: CoinlistComponent },
      { path: 'news', component: NewsComponent },
      { path: 'about', component: AboutComponent },
      { path: '', redirectTo: '/graph', pathMatch: 'full' },
      { path: '**', component: Error404Component }
    ]),
    MaterialModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }