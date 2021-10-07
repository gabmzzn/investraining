import { Component, OnInit } from '@angular/core'
import { animate, state, style, transition, trigger } from '@angular/animations'

@Component({
  selector: 'app-invest',
  templateUrl: './invest.component.html',
  styleUrls: ['./invest.component.css'],
})

export class InvestComponent {
  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['logo', 'name', 'symbol', 'amount'];
  expandedElement!: any
}

const ELEMENT_DATA = [
  {
    logo: 'https://cryptocompare.com/media/37746251/btc.png',
    name: 'Bitcoin',
    symbol: 'BTC',
    amount: '0.0054548 BTC'
  },
  {
    logo: 'https://cryptocompare.com/media/37746238/eth.png',
    name: 'Ethereum',
    symbol: 'ETH',
    amount: '1.235400 ETH'

  },
  {
    logo: 'https://cdn-icons-png.flaticon.com/512/5245/5245869.png',
    name: 'Stellar',
    symbol: 'XLM',
    amount: '43.7854548 XLM'

  },
]
