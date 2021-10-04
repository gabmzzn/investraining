import { Component, OnInit } from '@angular/core'
import { animate, state, style, transition, trigger } from '@angular/animations'


@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.css'],
})

export class CurrenciesComponent {

  async ngOnInit() {
    console.log(await fetch('https://min-api.cryptocompare.com/data/all/coinlist?fsym=BTC').then(res => res.json()))
    console.log(await fetch('https://min-api.cryptocompare.com/data/all/coinlist?fsym=ETH').then(res => res.json()))
    console.log(await fetch('https://min-api.cryptocompare.com/data/all/coinlist?fsym=DOGE').then(res => res.json()))

  }

  selectedCurrency: string = 'BTC'
  selectedCurrencyToCompare: string = 'USD'
  date: any = new Date()
  data: any
  JSONData: any
  isLoading: boolean = false
  isFirstLoading: boolean = false

  async getJSONData(fsym: string, tsym: string, timestamp: number, limit: number) {
    const url = 'https://min-api.cryptocompare.com/data/v2/histoday?fsym='
      + fsym + '&tsym=' + tsym + '&toTs=' + timestamp + '&limit=' + limit
    // + '&api_key=6e659e1244d9e7ccf3b6bdf6ada561766883d528a2025f01004787c096d1b005'
    const json = await fetch(url).then(res => res.json())
    return json.Data.Data
  }

  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['rank', 'logo', 'name', 'price', 'totalvolume', 'circulatingsupply', 'rating', 'marketcap', 'actions'];
  expandedElement: undefined
}

const ELEMENT_DATA = [
  {
    rank: '#1',
    logo: 'https://cryptocompare.com/media/37746251/btc.png',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: '$ 47.567.56',
    totalvolume: '728.89 B',
    circulatingsupply: '18.822.156',
    rating: 'B+',
    marketcap: '$ 894.92 B',
  },
  {
    rank: '#1',
    logo: 'https://cryptocompare.com/media/37746238/eth.png',
    name: 'Ethereum',
    symbol: 'ETH',
    price: '$ 47.567.56',
    totalvolume: '728.89 B',
    circulatingsupply: '18.822.156',
    rating: 'B+',
    marketcap: '$ 894.92 B',
  },
  {
    rank: '#1',
    logo: 'https://cryptocompare.com/media/37746339/doge.png',
    name: 'Doge',
    symbol: 'DOGE',
    price: '$ 47.567.56',
    totalvolume: '728.89 B',
    circulatingsupply: '18.822.156',
    rating: 'B+',
    marketcap: '$ 894.92 B',
  },
]
