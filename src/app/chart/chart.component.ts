import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { trigger, state, style, animate, transition } from '@angular/animations'
import { CryptoCompareAPI } from '../app.classes/CryptoCompareAPI'
import Chart from 'chart.js/auto'
import { CurrencyPipe } from '@angular/common'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'

interface Currency {
  name: string
  img: string
}

export interface PeriodicElement {
  name: string
  position: number
  weight: number
  symbol: string
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
]

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

export class ChartComponent implements AfterViewInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }


  data: any
  chart: any

  selectedValue!: string
  selectedValueToCompare!: string
  timeStamp!: string

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
    //This is needed because 
    //we need to slice 
    //the timestamp to 10 characters
    //or the API breaks
    this.timeStamp = Date.parse(date).toString().slice(0, 10)
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
    console.log(this.data)
    this.chart = new Chart('chart', {
      type: 'line',
      data: {
        datasets: [{
          backgroundColor: gradientHigh,
          data: this.data,
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
}