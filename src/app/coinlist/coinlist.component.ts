import { Component, OnInit } from '@angular/core'
import { animate, state, style, transition, trigger } from '@angular/animations'


@Component({
  selector: 'app-coinlist',
  templateUrl: './coinlist.component.html',
  styleUrls: ['./coinlist.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class CoinlistComponent {

  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['logo', 'name', 'symbol', 'website', 'launchdate'];
  expandedElement: Coin | undefined
}

export interface Coin {
  logo: string
  name: string
  symbol: string
  website: string
  launchdate: string
  description: string
}

const ELEMENT_DATA: Coin[] = [
  {
    logo: '/media/37746251/btc.png',
    name: 'Bitcoin',
    symbol: 'BTC',
    website: 'https://bitcoin.org/en/',
    launchdate: '2009-01-03',
    description: 'Bitcoin uses peer- to - peer technology to operate with no central authority or banks; managing transactions and the issuing of bitcoins is carried out collectively by the network.Although other cryptocurrencies have come before, Bitcoin is the first decentralized cryptocurrency - Its reputation has spawned copies and evolution in the space.With the largest variety of markets and the biggest value - having reached a peak of 318 billion USD - Bitcoin is here to stay.As with any new invention, the…he other cryptocurrencies.The price is as unstable as always and it can go up or down by 10 % -20 % in a single day.Bitcoin is an SHA - 256 POW coin with almost 21, 000, 000 total minable coins.The block time is 10 minutes.See below for a full range of Bitcoin markets where you can trade US Dollars for Bitcoin, crypto to Bitcoin and many other fiat currencies too.Bitcoin Whitepaper PDF - A Peer - to - Peer Electronic Cash SystemBlockchain data provided by: Blockchain(main source), Blockchair(backup)'
  }
]
