import { Component, OnInit, ViewChild } from '@angular/core'
import { trigger, state, style, animate, transition } from '@angular/animations'
import { CryptoCompareAPI } from '../app.classes/CryptoCompareAPI'
import Chart from 'chart.js/auto'
import { CurrencyPipe } from '@angular/common'

interface Currency {
  name: string
  img: string
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
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

export class ChartComponent {

  data: any
  chart: any
  firstSlice: any = 0
  lastSlice: any = 100

  selectedValue!: string
  selectedValueToCompare!: string
  timeStamp!: number

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
  ];

  currenciesToCompare: Currency[] = [
    { name: 'USD', img: 'https://cdn-icons-png.flaticon.com/512/197/197484.png' },
    { name: 'ARS', img: 'https://cdn-icons-png.flaticon.com/512/197/197573.png' },
    { name: 'EUR', img: 'https://cdn-icons-png.flaticon.com/512/197/197615.png' }
  ];

  constructor() { }

  OnDateChange(date: string) {
    this.timeStamp = Date.parse(date)
    this.drawGraph()
  }
  async drawGraph() {
    //Nullifier
    if (this.chart !== undefined) this.chart.destroy()

    // Chart background style
    var canvas: any = document.getElementById("chart")
    var ctx = canvas.getContext("2d")
    var gradientHigh = ctx.createLinearGradient(0, 0, 0, 400)
    gradientHigh.addColorStop(0, '#00d0ff')
    gradientHigh.addColorStop(1, 'rgba(0, 0, 0,0)')
    // var gradientLow = ctx.createLinearGradient(0, 0, 0, 550)
    // gradientLow.addColorStop(0, '#ff0000')
    // gradientLow.addColorStop(1, 'rgba(0, 0, 0,0)')

    this.data = await new CryptoCompareAPI().getHistorical(
      this.selectedValue, this.selectedValueToCompare,
      100, this.timeStamp, 'average')

    console.log(this.timeStamp)

    let dataset = this.data.slice(this.firstSlice, this.lastSlice)

    this.chart = new Chart('chart', {
      type: 'line',
      data: {
        datasets: [{
          backgroundColor: gradientHigh,
          data: dataset,
          fill: true,
          borderWidth: 2,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        },
          // {
          //   backgroundColor: gradientLow,
          //   data: low,
          //   fill: true,
          //   borderWidth: 2,
          //   borderColor: 'rgb(255, 0, 0)',
          //   tension: 0.2
          // }
        ]
      },
      options: {
        responsive: false,
        elements: {
          point: {
            radius: 0
          }
        },
        scales: {
          x: {
            type: 'linear'
          }
        }
      }
    })
  }

  sliceData() {
    let ok = this.data.slice(this.firstSlice++, this.lastSlice++)
    this.chart.data.datasets[0].data = ok
    this.chart.update()
  }
}