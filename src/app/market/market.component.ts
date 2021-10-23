import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core'
import { trigger, state, style, animate, transition } from '@angular/animations'
import { CurrencyPipe } from '@angular/common'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { FormControl } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ECharts, EChartsOption } from 'echarts'
import * as echarts from 'echarts'
import { AppService } from '../app.service'

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.8,
        backgroundColor: '#c6ecff'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ]
})

export class MarketComponent {

  constructor(
    private snackBar: MatSnackBar,
    private appService: AppService
    ) { }

  async ngOnInit() {
    window.scrollTo(0, 0);
    this.appService.isLoading = true
    await this.appService.getData()
    this.currency = this.appService.currencyList
    if (this.appService.selectedCurrency == undefined) {
      this.selectedCurrency = 'BTC'
    } else {
      this.selectedCurrency = this.appService.selectedCurrency
    }
    this.getMarketData()
  } 

  ngOnDestroy() {
    window.scrollTo(0, 0)
    // this.isLoadingGlobal = false
  }

  // set isLoadingGlobal(value: boolean) {
  //   this.appService.isLoading = value
  // }

  // get isLoadingGlobal() {
  //   return this.appService.isLoading
  // }

  isLoading = true
  selectedCurrency: string = 'BTC'
  selectedCurrencyToCompare: string = 'USD'
  date: any = new Date()
  data: any
  JSONData: any
  isFirstLoading: boolean = true

  async getJSONData(fsym: string, tsym: string, timestamp: number, limit: number) {
    const url = 'https://min-api.cryptocompare.com/data/v2/histoday?fsym='
      + fsym + '&tsym=' + tsym + '&toTs=' + timestamp + '&limit=' + limit
    // + '&api_key=6e659e1244d9e7ccf3b6bdf6ada561766883d528a2025f01004787c096d1b005'
    const json = await fetch(url).then(res => res.json())
    return json.Data.Data
  }

  async getMarketData() {
    // this.isLoadingGlobal = true
    this.isLoading = true
    this.JSONData = await this.getJSONData(
      this.selectedCurrency,
      this.selectedCurrencyToCompare,
      Date.parse(this.date) / 1000,
      999)
    this.StatsChart()
    this.HistoricalData()
    this.NewsFeed()
    this.CurrencyInfo().then(() => {
      // this.isLoadingGlobal = false
      this.isLoading = false
      this.isFirstLoading = false
    })
  }

  async updateData() {
    this.getMarketData()
  }


  // Stats Chart

  async StatsChart() {
    this.data = await this.JSONData.map((r: { time: any; close: any }) =>
      Object.values({ time: r.time * 1000, close: r.close }))
    this.mergeOptions = { series: [{ data: this.data, name: this.selectedCurrencyToCompare }] }
  }

  mergeOptions = {};
  chartOption: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        animation: false,
        label: {
          backgroundColor: '#505765'
        }
      }
    },
    grid: {
      left: 45,
      top: 30,
      right: 30,
      bottom: 30
    },
    // title: {
    //   left: 'center',
    //   text: this.selectedCurrency + ' to ' + this.selectedCurrencyToCompare
    // },
    xAxis: {
      type: 'time',
    },
    yAxis: {
      type: 'value',
      // min: 'dataMin',
      scale: true,
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgb(50, 50, 65, 0.85)'
        }
      }
    },
    dataZoom: [
      {
        type: 'inside',
        start: 80,
        end: 100
      },
      {
        start: 80,
        end: 100
      }
    ],
    series: [
      {
        name: this.selectedCurrencyToCompare,
        type: 'line',
        smooth: false,
        animationThreshold: 5000,
        showSymbol: false,
        symbolSize: 9,
        sampling: 'lttb',
        itemStyle: {
          color: '#20c689'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 1,
              color: 'transparent'
            },
            {
              offset: 0,
              color: '#20c689'
            }
          ])
        },
      }
    ]
  };

  Price!: number
  Description!: string
  SortOrder!: number
  Algorithm!: string
  PlatformType!: string
  TotalCoinsMined!: number
  Rating!: string
  AssetWebsiteUrl!: string
  TechnologyAdoptionRating!: string
  MarketPerformanceRating!: string
  high24!: number
  low24!: number
  PriceChange!: any
  ImageUrl!: string
  ImageUrlTC!: string
  CoinName!: string
  Symbol!: string

  async CurrencyInfo() {
    const coinlist = 'https://min-api.cryptocompare.com/data/all/coinlist?fsym=' + this.selectedCurrency
    const json = await fetch(coinlist).then(res => res.json())
    const singleprice = 'https://min-api.cryptocompare.com/data/price?fsym='
      + this.selectedCurrency + '&tsyms=' + this.selectedCurrencyToCompare
    const json2 = await fetch(singleprice).then(res => res.json())

    this.Price = json2[this.selectedCurrencyToCompare]
    this.Symbol = json.Data[this.selectedCurrency].Symbol
    this.CoinName = json.Data[this.selectedCurrency].CoinName
    this.Description = json.Data[this.selectedCurrency].Description.replaceAll(/\. /g, '.<br><br>')
    this.high24 = this.JSONData[999].high
    this.low24 = this.JSONData[999].low
    this.PriceChange = (this.Price - this.low24).toFixed(2)
    this.SortOrder = json.Data[this.selectedCurrency].SortOrder
    this.Rating = json.Data[this.selectedCurrency].Rating.Weiss.Rating
    this.TechnologyAdoptionRating = json.Data[this.selectedCurrency].Rating.Weiss.TechnologyAdoptionRating
    this.MarketPerformanceRating = json.Data[this.selectedCurrency].Rating.Weiss.MarketPerformanceRating
    if (json.Data[this.selectedCurrency].TotalCoinsMined == undefined) { this.TotalCoinsMined = 18822199} // This is because sometimes the API fails
    else { this.TotalCoinsMined = (json.Data[this.selectedCurrency].TotalCoinsMined).toFixed(0)}
    this.PlatformType = json.Data[this.selectedCurrency].PlatformType
    this.Algorithm = json.Data[this.selectedCurrency].Algorithm
    this.AssetWebsiteUrl = json.Data[this.selectedCurrency].AssetWebsiteUrl
    this.ImageUrl = json.Data[this.selectedCurrency].ImageUrl
    let i = this.currenciesToCompare.findIndex(((obj: any) => obj.name == this.selectedCurrencyToCompare))
    this.ImageUrlTC = this.currenciesToCompare[i].img
    if (this.Rating=='') {
      this.Rating = this.TechnologyAdoptionRating = this.MarketPerformanceRating = 'N/A'
    } 
  }

  // Historical Data

  dataSource = new MatTableDataSource()

  async HistoricalData() {
    this.dataSource = this.JSONData.slice(this.JSONData.length - 50).reverse()
  }

  // News Feed

  cards: any
  async NewsFeed() {
    const url = 'https://min-api.cryptocompare.com/data/v2/news/?lang=EN&categories=' + this.selectedCurrency
      + '&excludeCategories=Sponsored&lTs=' + Date.parse(this.date) / 1000
    const json = await fetch(url).then(res => res.json())
    this.cards = json.Data
    for (let i=0;i < json.Data.length; i++) {
      this.cards[i].body = json.Data[i].body.replaceAll(/\. /g, '.<br><br>')
    }
  }

  // Form Data

  currency!: any

  currenciesToCompare = [
    { name: 'USD', img: 'https://cdn-icons-png.flaticon.com/512/197/197484.png' },
    { name: 'ARS', img: 'https://cdn-icons-png.flaticon.com/512/197/197573.png' },
    { name: 'EUR', img: 'https://cdn-icons-png.flaticon.com/512/197/197615.png' }
  ]

}