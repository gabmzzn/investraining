import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'
import { MarketComponent } from './market/market.component'
import { AboutComponent } from './about/about.component'
import { CurrenciesComponent } from './currencies/currencies.component'
import { InvestComponent } from './invest/invest.component'

const routes: Routes = [
  { path: 'market', component: MarketComponent },
  { path: 'coinlist', component: CurrenciesComponent },
  { path: 'invest', component: InvestComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/coinlist', pathMatch: 'full' },
  { path: '**', redirectTo: '/coinlist', pathMatch: 'full' }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }