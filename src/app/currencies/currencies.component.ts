import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core'
import { animate, state, style, transition, trigger } from '@angular/animations'
import { MatTable, MatTableDataSource } from '@angular/material/table'
import { MarketComponent } from '../market/market.component'

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.css'],
  providers: [MarketComponent],
})

export class CurrenciesComponent {
  constructor(
    public comp: MarketComponent
  ) { }

  isFirstLoading: boolean = true

  dataSource: any = new MatTableDataSource([{
    rank: '', logo: '', name: '', symbol: '', price: '', totalvolume: '',
    circulatingsupply: '', marketcap: ''
  }])

  columnsToDisplay = ['rank', 'logo', 'name', 'price', 'totalvolume',
    'circulatingsupply', 'marketcap', 'buy', 'info'];

  async getCurrencyData() {
    setInterval(async () => {
      const currencieslist = ['BTC', 'ETH', 'BNB', 'ADA', 'SOL', 'USDT', 'XRP', 'USDC',
        'DOT', 'DOGE', 'LUNA', 'UNI', 'AVAX', 'BUSD', 'LINK', 'ALGO', 'LTC', 'BCH', 'WBTC',
        'MATIC', 'AXS', 'ATOM', 'ICP', 'FIL', 'XTZ', 'XLM', 'VET', 'FTT', 'ETC', 'TRX', 'DAI']

      let json = await fetch('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=' +
        'BTC,ETH,BNB,ADA,SOL,USDT,XRP,USDC,DOT,DOGE,LUNA,UNI,AVAX,BUSD,LINK,ALGO,LTC,BCH,WBTC,' +
        'MATIC,AXS,ATOM,ICP,FIL,XTZ,XLM,VET,FTT,ETC,TRX,DAI&tsyms=USD').then(res => res.json())

      let jsonArray: any = Object.values(await json), composedData: any = [], i = 0
      for (let crypto of currencieslist) {

        // let valueChange: number = (jsonArray[0][crypto].USD.PRICE - jsonArray[0][crypto].USD.LOW24HOUR) / jsonArray[0][crypto].USD.PRICE * 100
        // console.log(valueChange)
        // 0 = RAW Value, 1 = DISPLAY Value  
        composedData.push(
          {
            rank: i + 1,
            logo: jsonArray[1][crypto].USD.IMAGEURL,
            name: '',
            symbol: crypto,
            price: jsonArray[1][crypto].USD.PRICE,
            totalvolume: jsonArray[1][crypto].USD.TOTALTOPTIERVOLUME24HTO,
            circulatingsupply: jsonArray[1][crypto].USD.CIRCULATINGSUPPLY,
            marketcap: jsonArray[1][crypto].USD.MKTCAP,
          })
        i++
      }
      this.dataSource = composedData
      this.isFirstLoading = false
    }, 2000)
  }

  ngOnInit() {
    this.getCurrencyData()
  }
}
    // for (let crypto of currencieslist) {
    //   let json2 = await fetch('https://min-api.cryptocompare.com/data/all/coinlist?fsym='
    //     + crypto).then(res => res.json())
    //   const t4 = performance.now()
    //   console.log(`JSON2 took ${t4 - t0} milliseconds.`)
    //   composedJSON.push(Object.assign(json1array[i], json2))
    //   composedData.push(
    //     {
    //       rank: i + 1,
    //       logo: composedJSON[i].Data[crypto].ImageUrl,
    //       name: composedJSON[i].Data[crypto].CoinName,
    //       symbol: composedJSON[i].Data[crypto].Symbol,
    //       price: composedJSON[i].USD.PRICE,
    //       totalvolume: composedJSON[i].USD.TOTALTOPTIERVOLUME24HTO,
    //       circulatingsupply: composedJSON[i].USD.CIRCULATINGSUPPLY,
    //       rating: composedJSON[0].Data.BTC.Rating.Weiss.Rating,
    //       marketcap: composedJSON[i].USD.MKTCAP,
    //     })
