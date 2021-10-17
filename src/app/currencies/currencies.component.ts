import { Component, EventEmitter, Output } from '@angular/core'
import { MarketComponent } from '../market/market.component'
import { WebSocketSubject } from 'rxjs/webSocket'
import { DataService } from '../data.service';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.css'],
  providers: [MarketComponent],
})

export class CurrenciesComponent {

  ngOnInit() {
    this.getCurrencyData()
  }

  constructor(private dataService: DataService) { }

  set selectedCurrencyData(value:string) {
    this.dataService.selectedCurrency = value
  }

  set currencyListData(value: any) {
    this.dataService.currencyList = value
  }

  setRowInfo(row:any){
    this.selectedCurrencyData = row.symbol
  }

  isLoading: boolean = true
  isWebSocketLoading: boolean = true
  dataSource!: any
  performersSource!: any
  columnsToDisplay = ['rank', 'logo', 'name', 'updown', 'price', 'changepct', 'totalvolume',
    'marketcap', 'sparkchart', 'buy', 'info'];

  async getCurrencyData() {
    let composedData: any = [], clist='', i = 0

    const currencieslist = ['BTC', 'ETH', 'BNB', 'ADA', 'SOL', 'XRP',
      'DOT', 'DOGE', 'LUNA', 'UNI', 'AVAX', 'LINK', 'ALGO', 'LTC', 'BCH',
      'WBTC', 'MATIC', 'AXS', 'ATOM', 'ICP', 'FIL', 'XTZ', 'XLM', 'VET',
      'FTT', 'ETC', 'TRX', 'DAI', 'DASH', 'FTM', 'EGLD', 'XMR', 'CAKE',
      'EOS', 'XEC', 'AAVE', 'SUSHI', 'NEAR', 'SNX', 'QNT', 'GRT', 'NEO',
      'WAVES', 'KSM', 'LEO', 'MKR', 'BTT', 'ONE', 'HNT', 'AMP']
    const currenciesnames = ['Bitcoin', 'Ethereum', 'Binance', 'Cardano',
      'Solana', 'XRP', 'Polkadot', 'Dogecoin', 'Terra', 'Uniswap', 'Avalanche',
      'Chainlink', 'Algorand', 'Litecoin', 'Bitcoin Cash', 'Wrapped Bitcoin',
      'Polygon', 'Axie Infinity', 'Cosmos', 'Internet Computer', 'Filecoin', 
      'Tezos','Stellar', 'VeChain', 'FTX Token', 'Ethereum Classic', 'TRON', 
      'Dai', 'Dash', 'Fantom', 'Elrond', 'Monero', 'PancakeSwap', 'EOS', 
      'eCash', 'Aave', 'SushiSwap', 'NEAR Protocol', 'Synthetix', 'Quant', 
      'The Graph', 'Neo', 'Waves', 'Kusama', 'LEO Token', 'Maker', 
      'BitTorrent Token', 'Harmony', 'Helium', 'Amp']
    currencieslist.forEach(element => {
      clist += element + ','
    });
    let json: any = Object.values(await fetch('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=' +
      clist + '&tsyms=USD').then(res => res.json()))

    // Last hour timestamp
    let d = (new Date()).toString(), timestampLastHour = Date.parse((d.substr(0, 18) + ':00:00' + d.substr(24))) / 1000

    for (let currency of currencieslist) {
      // 0 = RAW Value, 1 = DISPLAY Value  
      let plussign, updown
      Math.random() > 0.5 ? updown = '▲' : updown = '▼'
      json[0][currency].USD.CHANGEPCT24HOUR > 0 ? plussign = '+' : plussign = ''
      composedData.push(
        {
          rank: i + 1,
          logo: json[1][currency].USD.IMAGEURL, //Ex: json.DISPLAY.BTC.USD.IMAGEURL
          name: currenciesnames[i],
          symbol: currency,
          price: json[1][currency].USD.PRICE,
          changepct: plussign + json[1][currency].USD.CHANGEPCT24HOUR,
          updown: updown,
          open24: json[0][currency].USD.OPEN24HOUR,
          totalvolume: json[1][currency].USD.TOTALTOPTIERVOLUME24HTO,
          marketcap: json[1][currency].USD.MKTCAP,
          sparkchart: 'https://images.cryptocompare.com/sparkchart/' + currency + '/USD/latest.png?ts=' + timestampLastHour
        })
      i++
    }

    this.currencyListData = composedData

    this.dataSource = composedData
    let performers = [...composedData].sort((a: any, b: any) => b.changepct - a.changepct)
    performers.splice(3, 44)
    this.performersSource = performers
    this.isLoading = false

    // WebSocket Connection 
    const apiKey = '6e659e1244d9e7ccf3b6bdf6ada561766883d528a2025f01004787c096d1b005'
    const subject = new WebSocketSubject('wss://streamer.cryptocompare.com/v2?api_key=' + apiKey)
    subject.next({
      'action': 'SubAdd',
      'subs':
        ['5~CCCAGG~BTC~USD', '5~CCCAGG~ETH~USD', '5~CCCAGG~BNB~USD', '5~CCCAGG~ADA~USD',
          '5~CCCAGG~SOL~USD', '5~CCCAGG~XRP~USD', '5~CCCAGG~DOT~USD', '5~CCCAGG~DOGE~USD',
          '5~CCCAGG~LUNA~USD', '5~CCCAGG~UNI~USD', '5~CCCAGG~AVAX~USD', '5~CCCAGG~LINK~USD',
          '5~CCCAGG~ALGO~USD', '5~CCCAGG~LTC~USD', '5~CCCAGG~BCH~USD', '5~CCCAGG~WBTC~USD',
          '5~CCCAGG~MATIC~USD', '5~CCCAGG~AXS~USD', '5~CCCAGG~ATOM~USD', '5~CCCAGG~ICP~USD',
          '5~CCCAGG~FIL~USD', '5~CCCAGG~XTZ~USD', '5~CCCAGG~XLM~USD', '5~CCCAGG~VET~USD',
          '5~CCCAGG~FTT~USD', '5~CCCAGG~ETC~USD', '5~CCCAGG~TRX~USD', '5~CCCAGG~DAI~USD',
          '5~CCCAGG~DASH~USD', '5~CCCAGG~FTM~USD', '5~CCCAGG~EGLD~USD', '5~CCCAGG~XMR~USD',
          '5~CCCAGG~CAKE~USD', '5~CCCAGG~EOS~USD', '5~CCCAGG~XEC~USD', '5~CCCAGG~AAVE~USD',
          '5~CCCAGG~SUSHI~USD', '5~CCCAGG~NEAR~USD', '5~CCCAGG~SNX~USD', '5~CCCAGG~QNT~USD',
          '5~CCCAGG~GRT~USD', '5~CCCAGG~NEO~USD', '5~CCCAGG~WAVES~USD', '5~CCCAGG~KSM~USD',
          '5~CCCAGG~LEO~USD', '5~CCCAGG~MKR~USD', '5~CCCAGG~BTT~USD', '5~CCCAGG~ONE~USD',
          '5~CCCAGG~HNT~USD', '5~CCCAGG~AMP~USD',
        ]
    })

    let subibaja: any = [], that = this
    for (let i = 0; i < currencieslist.length; i++) {
      subibaja.push({
        price: composedData[i].price
      })
    }

    subject.subscribe(data => pushWebSocketData(data))
    function pushWebSocketData(data: any) {
      if (data.PRICE !== undefined) {

        that.isWebSocketLoading = false
        let i1 = composedData.findIndex(((obj: any) => obj.symbol == data.FROMSYMBOL))
        composedData[i1].price = '$ ' + (data.PRICE.toLocaleString(
          'en-GB', {
          style: 'decimal',
          minimumFractionDigits: 2,
          maximumFractionDigits: 5,
        }))
        composedData[i1].changepct = (composedData[i1].changepct > 0 ? '+' : '') +
          (((data.PRICE - composedData[i1].open24) / data.PRICE) * 100).toFixed(2)

        if (composedData[i1].price > subibaja[i1].price) {
          subibaja[i1].price = composedData[i1].price
          composedData[i1].updown = '▲'
        } else if (composedData[i1].price < subibaja) {
          subibaja[i1].price = composedData[i1].price
          composedData[i1].updown = '▼'
        }
        let performers = [...composedData].sort((a: any, b: any) => b.changepct - a.changepct)
        performers.splice(3, 44)
        that.performersSource = performers
      }
    }
  }
}