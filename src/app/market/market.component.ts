import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { trigger, state, style, animate, transition } from '@angular/animations'
import { CryptoCompareAPI } from '../app.classes/CryptoCompareAPI'
import { CurrencyPipe } from '@angular/common'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { FormControl } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'

import { ECharts, EChartsOption } from 'echarts'
import * as echarts from 'echarts'


interface Currency {
  name: string
  img: string
}

interface HistoricalData {
  time: number
  high: number
  low: number
  open: number
  close: number
  volumefrom: number
  volumeto: number
}

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

  //
  // Global Variables
  //

  constructor(private snackBar: MatSnackBar) { }

  selectedValue: string = 'BTC'
  selectedValueToCompare: string = 'USD'
  timeStamp!: number
  data: any = []
  chart: any = new CryptoCompareAPI()

  currencies: Currency[] = [
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

  currenciesToCompare: Currency[] = [
    { name: 'USD', img: 'https://cdn-icons-png.flaticon.com/512/197/197484.png' },
    { name: 'ARS', img: 'https://cdn-icons-png.flaticon.com/512/197/197573.png' },
    { name: 'EUR', img: 'https://cdn-icons-png.flaticon.com/512/197/197615.png' }
  ]

  // @ViewChild(MatPaginator)
  // paginator!: MatPaginator

  // ngAfterViewInit() {this.dataSource.paginator = this.paginator}

  async ngOnInit() {
    this.timeStamp = Date.now() * 1000
    this.drawChart()
    this.getHistoricalData()
    this.cards = await this.chart.getNewsFeed(this.selectedValue)
    // console.log(await cp.getCoinList())
    // this.dataSource.paginator = this.paginator
  }

  async OnDateChange(date: string) {
    //This is needed because 
    //we need to slice 
    //the timestamp to 10 characters
    //or the API breaks
    this.timeStamp = Date.parse(date) / 1000
    this.drawChart()
    this.getHistoricalData()
    this.cards = await this.chart.getNewsFeed(this.selectedValue)
    // this.dataSource.paginator = this.paginator
    this.snackBar.open('Market data has been successfully updated', '', {
      duration: 3000
    })

  }


  //
  // Stats Chart
  //

  date = new FormControl(new Date());
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
    //   text: this.selectedValue + ' to ' + this.selectedValueToCompare
    // },
    xAxis: {
      type: 'time',
      // boundaryGap: false,
      // data: date
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
        name: this.selectedValueToCompare,
        type: 'line',
        animationThreshold: 2000,
        showSymbol: false,
        symbolSize: 8,
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
        data: [[Date.now(), 0], [Date.now() - 100000000000, 0]]
      }
    ]
  };

  async drawChart() {
    this.data = await this.chart.getHistorical(
      this.selectedValue, this.selectedValueToCompare,
      999, this.timeStamp, 'close')
    this.mergeOptions = { series: [{ data: this.data }] }
  }


  //
  // Historical Data
  //

  displayedColumns: string[] = ['time', 'high', 'low', 'open', 'close']
  HISTORICAL_DATA: HistoricalData[] = [
    { time: 0, high: 0, low: 0, open: 0, close: 0, volumefrom: 0, volumeto: 0 },
  ]
  dataSource = new MatTableDataSource<HistoricalData>(this.HISTORICAL_DATA)

  async getHistoricalData() {
    const HISTORICAL_DATA = await new CryptoCompareAPI().getHistorical(
      this.selectedValue, this.selectedValueToCompare,
      20, this.timeStamp, 'complete')
    this.dataSource = new MatTableDataSource<HistoricalData>(HISTORICAL_DATA)
  }

  columns = [
    // {
    //   columnDef: 'time',
    //   header: 'Date',
    //   cell: (element: HistoricalData) => `${element.time * 1000}`
    // },
    {
      columnDef: 'high',
      header: 'High',
      cell: (element: HistoricalData) => `$${element.high}`
    },
    {
      columnDef: 'low',
      header: 'Low',
      cell: (element: HistoricalData) => `$${element.low}`
    },
    {
      columnDef: 'open',
      header: 'Open',
      cell: (element: HistoricalData) => `$${element.open}`
    },
    {
      columnDef: 'close',
      header: 'Close',
      cell: (element: HistoricalData) => `$${element.close}`
    },
  ]


  //
  // News Feed
  //
  title = 'Vulnerable: Kraken reveals many US Bitcoin ATMs still use default admin QR codes'
  body = `Kraken has urged BATMTwo ATM owners and operators to 
  change the admin QR code for their ATMs to avoid potential attacks.`
  source_info = 'CoinTelegraph'
  published_on = 1632973503
  imageurl = 'https://images.cryptocompare.com/news/default/cointelegraph.png'
  url = 'https://cointelegraph.com/news/vulnerable-kraken-reveals-many-us-bitcoin-atms-still-use-default-admin-qr-codes'


  // cards = [
  //   {
  //     title: (e: NewsFeed) => `${e.title}`,
  //     body: (e: NewsFeed) => `${e.body}`,
  //     source_info: (e: NewsFeed) => `${e.source_info}`,
  //     published_on: (e: NewsFeed) => `${e.published_on}`,
  //     imageurl: (e: NewsFeed) => `${e.imageurl}`,
  //     url: (e: NewsFeed) => `${e.url}`,
  //   },
  // ]

  cards = [
    {
      title: '',
      body: '',
      source_info: { name: '' },
      published_on: 0,
      imageurl: '',
      url: '',
    },
  ]
}