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


import { AppComponent } from './app.component'
import { GraphComponent } from './graph/graph.component'
import { ListviewComponent } from './listview/listview.component'
import { Error404Component } from './error404/error404.component'
import { StatsComponent } from './stats/stats.component'
import { AboutComponent } from './about/about.component'
import { PeriodictableComponent } from './periodictable/periodictable.component'
import { CoinlistComponent } from './coinlist/coinlist.component'


@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    ListviewComponent,
    Error404Component,
    StatsComponent,
    AboutComponent,
    PeriodictableComponent,
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
    RouterModule.forRoot([
      { path: 'graph', component: GraphComponent },
      { path: 'coinlist', component: CoinlistComponent },
      { path: 'listview', component: ListviewComponent },
      { path: 'periodictable', component: PeriodictableComponent },
      { path: 'stats', component: StatsComponent },
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