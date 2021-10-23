import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'
import { MarketComponent } from './market/market.component'
import { AboutComponent } from './about/about.component'
import { CoindataComponent } from './coindata/coindata.component'
import { InvestComponent } from './invest/invest.component'

const routes: Routes = [
  { path: 'market', component: MarketComponent },
  { path: 'coindata', component: CoindataComponent },
  { path: 'invest', component: InvestComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/market', pathMatch: 'full' },
  { path: '**', redirectTo: '/market', pathMatch: 'full' }
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