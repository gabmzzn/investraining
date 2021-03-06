import { Component, EventEmitter, Output } from '@angular/core'
import { CoindataComponent } from '../coindata/coindata.component'
import { WebSocketSubject } from 'rxjs/webSocket'
import { AppService } from '../app.service'

@Component({
  selector: 'app-currencies',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css'],
  providers: [CoindataComponent],
})

export class MarketComponent {

  unrelatedTest() {
    const subject2 = this.subject = new WebSocketSubject('wss://ws.bitstamp.net/')
    subject2.next({ "event": "bts:subscribe", "data": { "channel": "live_trades_btcusd" } })
    subject2.next({ "event": "bts:subscribe", "data": { "channel": "live_trades_btceur" } })
    subject2.subscribe((data: any) => console.log(data))
  }

  ngOnInit() {
    window.scrollTo(0, 0)
    // this.unrelatedTest()
    // this.isLoadingGlobal = true
    // this.isLoading = this.isLoadingGlobal
    this.getCurrencyData()
  }

  ngOnDestroy() {
    window.scrollTo(0, 0)
    // this.isLoadingGlobal = false
    this.subject.complete()
  }

  // ngAfterViewInit() {
  //   this.getCurrencyData()
  // }

  constructor(private appService: AppService) { }

  set selectedCurrencyData(value: string) {
    this.appService.selectedCurrency = value
  }

  set currencyListData(value: any) {
    this.appService.currencyList = value
  }

  // set isLoadingGlobal(value: boolean) {
  //   this.appService.isLoading = value
  // }

  // get isLoadingGlobal() {
  //   return this.appService.isLoading
  // }

  setRowInfo(row: any) {
    this.selectedCurrencyData = row.symbol
  }

  isLoading = true
  isWebSocketLoading: boolean = true
  subject!: any
  dataSource!: any
  performersSource!: any
  columnsToDisplay = ['rank', 'logo', 'name', 'updown', 'price', 'changepct', 'totalvolume',
    'marketcap', 'sparkchart', 'info'];

  async getCurrencyData() {
    await this.appService.getData()
    this.dataSource = this.appService.currencyList
    let performers = [...this.appService.currencyList].sort((a: any, b: any) => b.changepct - a.changepct)
    performers.splice(3, 44)
    this.performersSource = performers

    // this.isLoadingGlobal = false
    this.isLoading = false

    // WebSocket Connection 
    const apiKey = '6e659e1244d9e7ccf3b6bdf6ada561766883d528a2025f01004787c096d1b005'
    this.subject = new WebSocketSubject('wss://streamer.cryptocompare.com/v2?api_key=' + apiKey)
    this.subject.next({
      'action': 'SubAdd',
      'subs':
        ['5~CCCAGG~BTC~USD', '5~CCCAGG~ETH~USD', '5~CCCAGG~BNB~USD', '5~CCCAGG~ADA~USD',
          '5~CCCAGG~SOL~USD', '5~CCCAGG~XRP~USD', '5~CCCAGG~DOGE~USD', '5~CCCAGG~LUNA~USD',
          '5~CCCAGG~UNI~USD', '5~CCCAGG~AVAX~USD', '5~CCCAGG~LINK~USD', '5~CCCAGG~ALGO~USD',
          '5~CCCAGG~LTC~USD', '5~CCCAGG~BCH~USD', '5~CCCAGG~WBTC~USD', '5~CCCAGG~MATIC~USD',
          '5~CCCAGG~AXS~USD', '5~CCCAGG~ATOM~USD', '5~CCCAGG~ICP~USD', '5~CCCAGG~FIL~USD',
          '5~CCCAGG~XTZ~USD', '5~CCCAGG~XLM~USD', '5~CCCAGG~VET~USD', '5~CCCAGG~FTT~USD',
          '5~CCCAGG~ETC~USD', '5~CCCAGG~TRX~USD', '5~CCCAGG~DAI~USD', '5~CCCAGG~DASH~USD',
          '5~CCCAGG~OXT~USD', '5~CCCAGG~FTM~USD', '5~CCCAGG~EGLD~USD', '5~CCCAGG~XMR~USD',
          '5~CCCAGG~CAKE~USD', '5~CCCAGG~EOS~USD', '5~CCCAGG~STX~USD', '5~CCCAGG~AAVE~USD',
          '5~CCCAGG~SUSHI~USD', '5~CCCAGG~NEAR~USD', '5~CCCAGG~SNX~USD', '5~CCCAGG~QNT~USD',
          '5~CCCAGG~GRT~USD', '5~CCCAGG~NEO~USD', '5~CCCAGG~WAVES~USD', '5~CCCAGG~KSM~USD',
          '5~CCCAGG~LEO~USD', '5~CCCAGG~MKR~USD', '5~CCCAGG~CHR~USD', '5~CCCAGG~ONE~USD',
          '5~CCCAGG~HNT~USD', '5~CCCAGG~AMP~USD',
        ]
    })

    let subibaja: any = [], that = this
    for (let i = 0; i < 50; i++) {
      subibaja.push({
        price: that.appService.currencyList[i].price
      })
    }
    this.subject.subscribe((data: any) => pushWebSocketData(data))

    function pushWebSocketData(data: any) {
      that.isWebSocketLoading = false
      if (data.PRICE !== undefined) {
        let i1 = that.appService.currencyList.findIndex(((obj: any) => obj.symbol == data.FROMSYMBOL))
        that.appService.currencyList[i1].price = '$ ' + (data.PRICE.toLocaleString(
          'en-GB', {
          style: 'decimal',
          minimumFractionDigits: 2,
          maximumFractionDigits: 5,
        }))
        that.appService.currencyList[i1].changepct = (that.appService.currencyList[i1].changepct >= 0 ? '+' : '') +
          (((data.PRICE - that.appService.currencyList[i1].open24) / data.PRICE) * 100).toFixed(2)

        if (that.appService.currencyList[i1].price > subibaja[i1].price) {
          subibaja[i1].price = that.appService.currencyList[i1].price
          that.appService.currencyList[i1].updown = '???'
        } else if (that.appService.currencyList[i1].price < subibaja) {
          subibaja[i1].price = that.appService.currencyList[i1].price
          that.appService.currencyList[i1].updown = '???'
        }
        let performers = [...that.appService.currencyList].sort((a: any, b: any) => b.changepct - a.changepct)
        performers.splice(3, 44)
        that.performersSource = performers
      }
    }
  }
}