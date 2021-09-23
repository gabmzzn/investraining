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
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
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

export class GraphComponent {

  data: any
  chart: any
  firstSlice: any = 0
  lastSlice: any = 50

  selectedValue!: string
  selectedValueToCompare!: string

  currencies: Currency[] = [
    { name: 'BTC', img: 'https://cdn-icons-png.flaticon.com/512/825/825540.png' },
    { name: 'USD', img: 'https://cdn-icons-png.flaticon.com/512/197/197484.png' },
    { name: 'ARS', img: 'https://cdn-icons-png.flaticon.com/512/197/197573.png' }
  ];

  currenciesToCompare: Currency[] = [
    { name: 'BTC', img: 'https://cdn-icons-png.flaticon.com/512/825/825540.png' },
    { name: 'USD', img: 'https://cdn-icons-png.flaticon.com/512/197/197484.png' },
    { name: 'ARS', img: 'https://cdn-icons-png.flaticon.com/512/197/197573.png' }
  ];

  constructor() { }

  async ngOnInit() {

    // Chart background style
    var canvas: any = document.getElementById("chart")
    var ctx = canvas.getContext("2d")
    var gradientHigh = ctx.createLinearGradient(0, 0, 0, 400)
    gradientHigh.addColorStop(0, '#00d0ff')
    gradientHigh.addColorStop(1, 'rgba(0, 0, 0,0)')
    // var gradientLow = ctx.createLinearGradient(0, 0, 0, 550)
    // gradientLow.addColorStop(0, '#ff0000')
    // gradientLow.addColorStop(1, 'rgba(0, 0, 0,0)')

    this.data = await new CryptoCompareAPI().getHistorical('USD', 'ARS', 100, 1631610943, 'average')
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