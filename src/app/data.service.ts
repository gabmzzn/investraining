import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  selectedCurrency!: string;
  currencyList!: any;

  constructor() { }
}
