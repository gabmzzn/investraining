import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule, PreloadAllModules } from '@angular/router'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { webSocket } from "rxjs/webSocket"

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
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatIconModule } from '@angular/material/icon'
import { MatTabsModule } from '@angular/material/tabs'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatDialogModule } from '@angular/material/dialog'
import { MatStepperModule } from '@angular/material/stepper'
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';

import { AppComponent } from './app.component'
import { MarketComponent } from './market/market.component'
import { AboutComponent } from './about/about.component'
import { CoindataComponent } from './coindata/coindata.component'
import { InvestComponent } from './invest/invest.component'
import { AddFundsDialog } from './invest/invest.component'
import { BuyCryptoDialog } from './invest/invest.component'
import { ConvertCryptoDialog } from './invest/invest.component'
import { TransactionDetailsDialog } from './invest/invest.component'
import { WithdrawDialog } from './invest/invest.component'

import { NgxEchartsModule } from 'ngx-echarts'

import { MatSortModule } from '@angular/material/sort';
import { AppRoutingModule } from './app.routing.module'

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    MarketComponent,
    CoindataComponent,
    InvestComponent,
    AddFundsDialog,
    BuyCryptoDialog,
    ConvertCryptoDialog,
    TransactionDetailsDialog,
    WithdrawDialog,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatListModule,
    MatChipsModule,
    MatTooltipModule,
    MatDialogModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatProgressBarModule,
    MaterialModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }