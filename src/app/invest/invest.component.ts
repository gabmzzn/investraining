import { Component, OnInit } from '@angular/core'
import { animate, state, style, transition, trigger } from '@angular/animations'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-invest',
  templateUrl: './invest.component.html',
  styleUrls: ['./invest.component.css'],
})

export class InvestComponent {
  dataSource = ELEMENT_DATA;
  dataSource2 = ELEMENT_DATA2;
  expandedElement!: any

  constructor(public dialog: MatDialog) { }

  openBuyCryptoDialog(): void {
    this.dialog.open(BuyCryptoDialog, {
      width: '250px',
    })
  }

  openConvertCryptoDialog(): void {
    this.dialog.open(ConvertCryptoDialog, {
      width: '250px',
    })
  }

  openAddFundsDialog(): void {
    this.dialog.open(AddFundsDialog, {
      width: '250px',
    })
  }

  openWithdrawDialog(): void {
    this.dialog.open(WithdrawDialog, {
      width: '250px',
    })
  }

  openTransactionDetailsDialog(): void {
    this.dialog.open(TransactionDetailsDialog, {
      width: '250px',
    })
  }

}

@Component({
  selector: 'buycrypto',
  templateUrl: 'dialogs/buycrypto.dialog.html',
})

export class BuyCryptoDialog {

  constructor(
    public dialogRef: MatDialogRef<BuyCryptoDialog>) { }

  onNoClick(): void {
    this.dialogRef.close()
  }
}

@Component({
  selector: 'convertcrypto',
  templateUrl: 'dialogs/convertcrypto.dialog.html',
})

export class ConvertCryptoDialog {

  constructor(
    public dialogRef: MatDialogRef<ConvertCryptoDialog>) { }

  onNoClick(): void {
    this.dialogRef.close()
  }
}

@Component({
  selector: 'addfunds',
  templateUrl: 'dialogs/addfunds.dialog.html',
})

export class AddFundsDialog {

  constructor(
    public dialogRef: MatDialogRef<AddFundsDialog>) { }

  onNoClick(): void {
    this.dialogRef.close()
  }
}

@Component({
  selector: 'withdraw',
  templateUrl: 'dialogs/withdraw.dialog.html',
})

export class WithdrawDialog {

  constructor(
    public dialogRef: MatDialogRef<WithdrawDialog>) { }

  onNoClick(): void {
    this.dialogRef.close()
  }
}

@Component({
  selector: 'transactiondetails',
  templateUrl: 'dialogs/transactiondetails.dialog.html',
})

export class TransactionDetailsDialog {

  constructor(
    public dialogRef: MatDialogRef<TransactionDetailsDialog>) { }

  onNoClick(): void {
    this.dialogRef.close()
  }
}

const ELEMENT_DATA2 = [
  {
    logo: 'https://cryptocompare.com/media/37746251/btc.png',
    name: 'Bitcoin',
    symbol: 'BTC',
    amount: '0.0054548 BTC',
    date: '10/2/2018'
  },
  {
    logo: 'https://cryptocompare.com/media/37746238/eth.png',
    name: 'Ethereum',
    symbol: 'ETH',
    amount: '1.235400 ETH',
    date: '10/2/2018'

  },
  {
    logo: 'https://cdn-icons-png.flaticon.com/512/5245/5245869.png',
    name: 'Stellar',
    symbol: 'XLM',
    amount: '43.7854548 XLM',
    date: '10/2/2018'

  }
]


const ELEMENT_DATA = [
  {
    logo: 'https://cryptocompare.com/media/37746251/btc.png',
    name: 'Bitcoin',
    symbol: 'BTC',
    amount: '0.0054548 BTC',
    date: '10/2/2018'
  },
  {
    logo: 'https://cryptocompare.com/media/37746238/eth.png',
    name: 'Ethereum',
    symbol: 'ETH',
    amount: '1.235400 ETH',
    date: '10/2/2018'

  },
  {
    logo: 'https://cdn-icons-png.flaticon.com/512/5245/5245869.png',
    name: 'Stellar',
    symbol: 'XLM',
    amount: '43.7854548 XLM',
    date: '10/2/2018'

  },
  {
    logo: 'https://cryptocompare.com/media/37746251/btc.png',
    name: 'Bitcoin',
    symbol: 'BTC',
    amount: '0.0054548 BTC',
    date: '10/2/2018'
  },
  {
    logo: 'https://cryptocompare.com/media/37746238/eth.png',
    name: 'Ethereum',
    symbol: 'ETH',
    amount: '1.235400 ETH',
    date: '10/2/2018'

  },
  {
    logo: 'https://cdn-icons-png.flaticon.com/512/5245/5245869.png',
    name: 'Stellar',
    symbol: 'XLM',
    amount: '43.7854548 XLM',
    date: '10/2/2018'

  },
]
