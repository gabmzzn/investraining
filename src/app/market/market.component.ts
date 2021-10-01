import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core'
import { trigger, state, style, animate, transition } from '@angular/animations'
import { CurrencyPipe } from '@angular/common'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { FormControl } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'

import { ECharts, EChartsOption } from 'echarts'
import * as echarts from 'echarts'


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

export class MarketComponent implements OnInit {

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getMarketData()
  }

  selectedCurrency: string = 'BTC'
  selectedCurrencyToCompare: string = 'USD'
  date: any = new Date()
  data: any = []
  JSONData: any
  isLoading: boolean = false
  cards!: any

  async getJSONData(fsym: string, tsym: string, timestamp: number, limit: number) {
    const url = 'https://min-api.cryptocompare.com/data/v2/histoday?fsym='
      + fsym + '&tsym=' + tsym + '&toTs=' + timestamp + '&limit=' + limit
    // + '&api_key=6e659e1244d9e7ccf3b6bdf6ada561766883d528a2025f01004787c096d1b005'
    const json = await fetch(url).then(res => res.json())
    return json.Data.Data
  }

  async getMarketData() {
    this.JSONData = await this.getJSONData(
      this.selectedCurrency,
      this.selectedCurrencyToCompare,
      Date.parse(this.date) / 1000,
      999)
    this.StatsChart()
    this.CurrencyInfo()
    this.HistoricalData()
    this.NewsFeed()
  }

  async updateData() {
    this.isLoading = true
    this.getMarketData()
      .then(() => {
        this.snackBar.open('Market data has been successfully updated', '',
          { duration: 3000 })
        this.isLoading = false
      })
  }


  // Stats Chart

  async StatsChart() {
    this.data = await this.JSONData.map((r: { time: any; close: any }) =>
      Object.values({ time: r.time * 1000, close: r.close }))
    this.mergeOptions = { series: [{ data: this.data }] }
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
    // title: {
    //   left: 'center',
    //   text: this.selectedCurrency + ' to ' + this.selectedCurrencyToCompare
    // },
    xAxis: {
      type: 'time',
    },
    yAxis: {
      type: 'value',
      boundaryGap: false,
      splitLine: {
        show: false
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
        animationThreshold: 2000,
        showSymbol: false,
        symbolSize: 9,
        sampling: 'lttb',
        itemStyle: {
          color: 'rgb(255, 70, 131)'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 1,
              color: 'transparent'
            },
            {
              offset: 0,
              color: 'rgb(255, 70, 131)'
            }
          ])
        },
      }
    ]
  };

  titleInfo!: string
  descriptionInfo!: string

  async CurrencyInfo() {
    const url = 'https://min-api.cryptocompare.com/data/all/coinlist?fsym=' + this.selectedCurrency
    const json = await fetch(url).then(res => res.json())
    this.titleInfo = "What is " + eval("json.Data." + this.selectedCurrency + ".FullName") + "?"
    this.descriptionInfo = (eval("json.Data." + this.selectedCurrency + ".Description")).replaceAll(/\. /g, '.<br><br>')
    console.log(this.descriptionInfo)
    eval("json.Data." + this.selectedCurrency + ".SortOrder")
  }


  // Historical Data

  displayedColumns: string[] = ['time', 'high', 'low', 'open', 'close']
  dataSource = new MatTableDataSource([{ time: 0, high: 0, low: 0, open: 0, close: 0 }])

  async HistoricalData() {
    this.dataSource = new MatTableDataSource(
      this.JSONData.slice(this.JSONData.length - 50).reverse())
  }

  columns = [
    {
      columnDef: 'high',
      header: 'High',
      cell: (e: any) => `$ ${e.high}`
    },
    {
      columnDef: 'low',
      header: 'Low',
      cell: (e: any) => `$ ${e.low}`
    },
    {
      columnDef: 'open',
      header: 'Open',
      cell: (e: any) => `$ ${e.open}`
    },
    {
      columnDef: 'close',
      header: 'Close',
      cell: (e: any) => `$ ${e.close}`
    },
  ]


  // News Feed

  async NewsFeed() {
    const url = 'https://min-api.cryptocompare.com/data/v2/news/?lang=EN&categories=' + this.selectedCurrency
      + '&excludeCategories=Sponsored&lTs=' + Date.parse(this.date) / 1000
    const json = await fetch(url).then(res => res.json())
    this.cards = json.Data
  }


  // Form Data

  currencies = [
    { name: 'BTC', img: 'https://cryptocompare.com/media/37746251/btc.png' },
    { name: 'ETH', img: 'https://cryptocompare.com/media/37746238/eth.png' },
    { name: 'XLM', img: 'https://cdn-icons-png.flaticon.com/512/5245/5245869.png' },
    { name: 'BNB', img: 'https://www.cryptocompare.com/media/37746880/bnb.png' },
    { name: 'ADA', img: 'https://cryptocompare.com/media/37746235/ada.png' },
    { name: 'DOGE', img: 'https://cryptocompare.com/media/37746339/doge.png' },
    { name: 'XRP', img: 'https://cryptocompare.com/media/38553096/xrp.png' },
    { name: 'LTC', img: 'https://cryptocompare.com/media/37746243/ltc.png' },
    { name: 'BCH', img: 'https://cryptocompare.com/media/37746245/bch.png' },
    { name: 'LINK', img: 'https://cryptocompare.com/media/37746242/link.png' },
  ]

  currenciesToCompare = [
    { name: 'USD', img: 'https://cdn-icons-png.flaticon.com/512/197/197484.png' },
    { name: 'ARS', img: 'https://cdn-icons-png.flaticon.com/512/197/197573.png' },
    { name: 'EUR', img: 'https://cdn-icons-png.flaticon.com/512/197/197615.png' }
  ]

}