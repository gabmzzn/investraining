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
import { MatIconModule } from '@angular/material/icon'
import { MatTabsModule } from '@angular/material/tabs'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSnackBarModule } from '@angular/material/snack-bar'

import { AppComponent } from './app.component'
import { MarketComponent } from './market/market.component'
import { AboutComponent } from './about/about.component'
import { CurrenciesComponent } from './currencies/currencies.component'
import { HighchartsChartModule } from "highcharts-angular"
import { NgxEchartsModule } from 'ngx-echarts'


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    MarketComponent,
    CurrenciesComponent,
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
    MatPaginatorModule,
    MatIconModule,
    HighchartsChartModule,
    MatSnackBarModule,
    MaterialModule,
    // HighchartsChartComponent,
    RouterModule.forRoot([
      { path: 'market', component: MarketComponent },
      { path: 'coinlist', component: CurrenciesComponent },
      { path: 'about', component: AboutComponent },
      { path: '', redirectTo: '/market', pathMatch: 'full' },
      { path: '**', redirectTo: '/market', pathMatch: 'full' }
    ]),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }