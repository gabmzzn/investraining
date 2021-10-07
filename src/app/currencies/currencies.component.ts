import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core'
import { animate, state, style, transition, trigger } from '@angular/animations'
import { MatTable, MatTableDataSource } from '@angular/material/table'
import { MarketComponent } from '../market/market.component'
import { webSocket, WebSocketSubject } from 'rxjs/webSocket'

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

  dataSource!: any
  performers!: any

  columnsToDisplay = ['rank', 'logo', 'name', 'price', 'changepct', 'totalvolume',
    'circulatingsupply', 'marketcap', 'buy', 'info'];

  async getCurrencyData() {
    let composedData: any = []

    const currencieslist = ['BTC', 'ETH', 'BNB', 'ADA', 'SOL', 'USDT', 'XRP', 'USDC',
      'DOT', 'DOGE', 'LUNA', 'UNI', 'AVAX', 'BUSD', 'LINK', 'ALGO', 'LTC', 'BCH', 'WBTC',
      'MATIC', 'AXS', 'ATOM', 'ICP', 'FIL', 'XTZ', 'XLM', 'VET', 'FTT', 'ETC', 'TRX', 'DAI']
    const currenciesnames = ['Bitcoin', 'Ethereum', 'Binance', 'Cardano', 'Solana', 'Tether',
      'XRP', 'USD Coin', 'Polkadot', 'Dogecoin', 'Terra', 'Uniswap', 'Avalanche', 'Binance USD',
      'Chainlink', 'Algorand', 'Litecoin', 'Bitcoin Cash', 'Wrapped Bitcoin', 'Plygon', 'Axie Infinity',
      'Cosmos', 'Internet Computer', 'Filecoin', 'Tezos', 'Stellar', 'VeChain', 'FTX Token',
      'Ethereum Classic', 'TRON', 'Dai']
    let json = await fetch('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=' +
      'BTC,ETH,BNB,ADA,SOL,USDT,XRP,USDC,DOT,DOGE,LUNA,UNI,AVAX,BUSD,LINK,ALGO,LTC,BCH,WBTC,' +
      'MATIC,AXS,ATOM,ICP,FIL,XTZ,XLM,VET,FTT,ETC,TRX,DAI&tsyms=USD').then(res => res.json())

    let jsonArray: any = Object.values(await json), i = 0
    this.performers = []
    composedData = []
    for (let currency of currencieslist) {
      // 0 = RAW Value, 1 = DISPLAY Value  
      let plussign
      jsonArray[1][currency].USD.CHANGEPCT24HOUR >= 0 ? plussign = '+' : plussign = ''
      composedData.push(
        {
          rank: i + 1,
          logo: jsonArray[1][currency].USD.IMAGEURL,
          name: currenciesnames[i],
          symbol: currency,
          price: '$ ' + jsonArray[0][currency].USD.PRICE,
          changepct: plussign + jsonArray[1][currency].USD.CHANGEPCT24HOUR,
          totalvolume: jsonArray[1][currency].USD.TOTALTOPTIERVOLUME24HTO,
          circulatingsupply: jsonArray[1][currency].USD.CIRCULATINGSUPPLY,
          marketcap: jsonArray[1][currency].USD.MKTCAP,
        })
      this.performers.push({
        name: currenciesnames[i],
        symbol: currency,
        logo: jsonArray[1][currency].USD.IMAGEURL,
        changepct: plussign + jsonArray[1][currency].USD.CHANGEPCT24HOUR,
        price: jsonArray[1][currency].USD.PRICE,
      })
      i++
    }
    this.performers.sort((a: { changepct: number }, b: { changepct: number }) => b.changepct - a.changepct)
    this.dataSource = composedData
    this.isFirstLoading = false

    let apiKey = "6e659e1244d9e7ccf3b6bdf6ada561766883d528a2025f01004787c096d1b005"
    const subject = new WebSocketSubject('wss://streamer.cryptocompare.com/v2?api_key=' + apiKey)
    var subRequest = {
      "action": "SubAdd",
      "subs":
        ["5~CCCAGG~BTC~USD", "5~CCCAGG~ETH~USD", "5~CCCAGG~BNB~USD", "5~CCCAGG~ADA~USD",
          "5~CCCAGG~SOL~USD", "5~CCCAGG~USDT~USD", "5~CCCAGG~XRP~USD", "5~CCCAGG~USDC~USD",
          "5~CCCAGG~DOT~USD", "5~CCCAGG~DOGE~USD", "5~CCCAGG~LUNA~USD", "5~CCCAGG~UNI~USD",
          "5~CCCAGG~AVAX~USD", "5~CCCAGG~BUSD~USD", "5~CCCAGG~LINK~USD", "5~CCCAGG~ALGO~USD",
          "5~CCCAGG~LTC~USD", "5~CCCAGG~BCH~USD", "5~CCCAGG~WBTC~USD", "5~CCCAGG~MATIC~USD",
          "5~CCCAGG~AXS~USD", "5~CCCAGG~ATOM~USD", "5~CCCAGG~ICP~USD", "5~CCCAGG~FIL~USD",
          "5~CCCAGG~XTZ~USD", "5~CCCAGG~XLM~USD", "5~CCCAGG~VET~USD", "5~CCCAGG~FTT~USD",
          "5~CCCAGG~ETC~USD", "5~CCCAGG~TRX~USD", "5~CCCAGG~DAI~USD"]
    }

    let data: any
    subject.next(subRequest)
    subject.subscribe(message => pushWebSocketData(message))
    function pushWebSocketData(data: any) {
      let pricesocket, symbol: string
      if (data.PRICE !== undefined) pricesocket = data.PRICE; symbol = data.FROMSYMBOL
      if (pricesocket !== undefined && data.FROMSYMBOL == symbol) {
        let index = composedData.findIndex(((obj: { symbol: string }) => obj.symbol == symbol))
        composedData[index].price = '$ ' + pricesocket
      }
    }

  }

  ngOnInit() {
    this.getCurrencyData()
  }

}