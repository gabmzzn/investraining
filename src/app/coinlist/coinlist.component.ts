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
    logo: 'https://cryptocompare.com/media/37746251/btc.png',
    name: 'Bitcoin',
    symbol: 'BTC',
    website: 'https://bitcoin.org',
    launchdate: '2009-01-03',
    description: 'Bitcoin uses peer- to - peer technology to operate with no central authority or banks; managing transactions and the issuing of bitcoins is carried out collectively by the network.Although other cryptocurrencies have come before, Bitcoin is the first decentralized cryptocurrency - Its reputation has spawned copies and evolution in the space.With the largest variety of markets and the biggest value - having reached a peak of 318 billion USD - Bitcoin is here to stay.As with any new invention, the…he other cryptocurrencies.The price is as unstable as always and it can go up or down by 10 % -20 % in a single day.Bitcoin is an SHA - 256 POW coin with almost 21, 000, 000 total minable coins.The block time is 10 minutes.See below for a full range of Bitcoin markets where you can trade US Dollars for Bitcoin, crypto to Bitcoin and many other fiat currencies too.Bitcoin Whitepaper PDF - A Peer - to - Peer Electronic Cash SystemBlockchain data provided by: Blockchain(main source), Blockchair(backup)'
  },
  {
    logo: 'https://cryptocompare.com/media/37746238/eth.png',
    name: 'Ethereum',
    symbol: 'ETH',
    website: 'https://ethereum.org',
    launchdate: '2015-07-30',
    description: 'Ethereum is a decentralized platform that runs smart contracts (applications that run exactly as programmed without any possibility of downtime, censorship, fraud or third party interference). In the Ethereum protocol and blockchain, there is a price for each operation. In order to have anything transferred or executed by the network, you have to consume or burn Gas. Ethereum’s native cryptocurrency is Ether (ETH) and it is used to pay for computation time and transaction fees.The introductory whitepaper was originally published in 2013 by Vitalik Buterin, the founder of Ethereum, the project was crowdfunded during August 2014 by fans all around the world and launched in 2015. Ethereum is developed and maintained by ETHDEV with contributions from minds across the globe. There is an Ecosystem Support Program which is a branch of the Ethereum Foundation focused on supporting projects and entities within the greater Ethereum community to promote the success and growth of the ecosystem. Multiple startups work with the Ethereum blockchain covering areas in: DeFi, NFTs, Ethereum Name Service, Wallets, Scaling, etc.The launch of Ethereum is a process divided into 4 main phases: Frontier, Homestead, Metropolis and Serenity.Ethereum 2.0, also known as Serenity, is the final phase of Ethereum, it aims to solve the decentralized scaling challenge. A naive way to solve Ethereum&#39;s problems would be to make it more centralized. But decentralization is too important, as it gives Ethereum censorship resistance, openness, data privacy and near-unbreakable security.The Eth2 upgrades will make Ethereum scalable, secure, and decentralized. Sharding will make Ethereum more scalable by increasing transactions per second while decreasing the power needed to run a node and validate the chain. The beacon chain will make Ethereum secure by coordinating validators across shards. And staking will lower the barrier to participation, creating a larger – more decentralized – network.The beacon chain will also introduce proof-of-stake to Ethereum. Ethereum is moving to the proof-of-stake (PoS) consensus mechanism from proof-of-work (PoW). This was always the plan as it&#39;s a key part of the community&#39;s strategy to scale Ethereum via the Eth2 upgrades. However, getting PoS right is a big technical challenge and not as straightforward as using PoW to reach consensus across the networkKeep up with Ethereum upgradesFor ETH holders and Dapp users, this has no impact whatsoever, however, for users wishing to get involved, there are ways to participate in Ethereum and future Eth2-related efforts. Get involved in Eth 2.0Blockchain data provided by: Etherchain (Main Source), Blockchair (Backup), and Etherscan (Total Supply only).'
  },
  {
    logo: 'https://cdn-icons-png.flaticon.com/512/5245/5245869.png',
    name: 'Stellar',
    symbol: 'XLM',
    website: 'https://stellar.org',
    launchdate: '2014-07-31',
    description: 'Stellar is a decentralized platform that aims to connect banks, payments systems, and people. Integrate to move money quickly, reliably, and at almost no cost. Supported by a nonprofit, Stellar&#39;s goal is to bring the world together by increasing interoperability between diverse financial systems and currencies.Stellar is a technology that enables money to move directly between people, companies and financial institutions as easily as email. This means more access for individuals, lower costs for banks and more revenue for businesses.Stellar Lumens is not mineable and does not use proof of work (PoW). Instead, Stellar uses SCP, the stellar consensus protocol. Blockchain data provided by: Blockchair (Block Number), Stellar.org Dashboard (Total Supply)LinkedInWhitepaper'
  },
  {
    logo: 'https://cryptocompare.com/media/37746880/bnb.png',
    name: 'Binance Coin',
    symbol: 'BNB',
    website: 'https://binance.com',
    launchdate: '2017-06-27',
    description: 'BNB powers the Binance ecosystem and is the native asset of the Binance Chain. BNB is a cryptocurrency created in June 2017, launched during an ICO in July, and initially issued as an ERC-20 token. Designed to be used for a fee reduction on the Binance exchange, its scope was extended over the years.BNB powers the Binance Chain as its native chain token. For instance, it is used to pay fees on the Binance DEX, issue new tokens, send/cancel orders, and transfer assets.BNB is also powering the Binance Smart Chain, which is an EVM-compatible network, forked from “go-ethereum”. It supports smart contracts and relies on a new consensus mechanism: Proof-of-Staked Authority (PoSA) consensus (“Parlia”), which incorporates elements from both Proof of Stake and Proof of Authority. BNB is used for delegated staking on the authority validator, leading to staking rewards for users and validators.Besides its on-chain functions, BNB has multiple additional use-cases such as fee discounts on multiple exchanges (e.g., Binance.com), payment asset on third-party services, and participation rights &amp; transacting currency on Binance Launchpad.At the core of the economics of BNB, there is a burn mechanism leading to period reductions in its total supply (~ every three months). From its initial maximum supply of 200 million, burns are expected to continue until the supply reaches 100 million.Telegram | Facebook | Instagram | YouTubeWhitepaper'
  },
  {
    logo: 'https://cdn4.iconfinder.com/data/icons/crypto-currency-and-coin-2/256/cardano_ada-512.png',
    name: 'Cardano',
    symbol: 'ADA',
    website: 'https://cardano.org',
    launchdate: '2017-10-05',
    description: 'Designed and developed by IOHK in conjunction with the University of Edinburgh, the University of Athens and the University of Connecticut, Cardano SL (or Cardano Settlement Layer) is a Proof of Stake cryptocurrency based on the Haskell implementation of the white paper “Ouroboros: A Provably Secure Proof of Stake Blockchain Protocol” by Aggelos Kiayias, Alexander Russell, Bernardo David and Roman Oliynykov.Blockchain data provided by: BlockchairTelegram | Facebook | YouTube | LinkedIn'
  },
  {
    logo: 'https://cryptocompare.com/media/37746339/doge.png',
    name: 'Dogecoin',
    symbol: 'DOGE',
    website: 'https://dogecoin.com',
    launchdate: '2013-12-06',
    description: 'A Bitcoin clone that has reached success through clever marketing. Over the past year well over a hundred new cryptocurrencies have been created but not many have instantly carved out a niche. Dogecoin has sponsored multiple high profile events such as Nascar teams and the winter Olympics - even so, there are few locations to use the coin - and instead, it has become a de facto internet tipping currency. The coin has produced 100 billion units by the end of 2014 and is now producing roughly 5 billion units per year.Blockchain data provided by: Blockchair (Main Source), DogeChain (Backup), and WhatToMine (Block Reward and Time only)Discord | Facebook'
  },
  {
    logo: 'https://cryptocompare.com/media/38553096/xrp.png',
    name: 'XRP',
    symbol: 'XRP',
    website: 'https://ripple.com',
    launchdate: '2013-01-01',
    description: 'XRP positions itself as one of the most liquid currencies which is fast (settles in 3-5 seconds), scalable (can handle 1,500 transactions per second), decentralized (140+ validators), stable (7-year track record) and with a negligible energy consumption (due to the consensus protocol vs proof-of-work). XRP is a distributed network which means transactions occur immediately across the network - and as it is peer to peer - the network is resilient to systemic risk. XRPs aren&#39;t mined - unlike bitcoin and its peers - but each transaction destroys a small amount of XRP which adds a deflationary measure into the system.Blockchain data provided by: Blockchair (Block/Ledgers Number only), Ripple Data API (Total Supply only)Telegram | Facebook | LinkedIn'
  },
  {
    logo: 'https://cryptocompare.com/media/37746243/ltc.png',
    name: 'Litecoin',
    symbol: 'LTC',
    website: 'https://litecoin.com',
    launchdate: '2009-01-03',
    description: 'Litecoin LTC - provides faster transaction confirmations (2.5 minutes on average) and uses a memory-hard, scrypt-based mining proof-of-work algorithm to target the regular computers and GPUs most people already have - which are its main differentials to Bitcoin. The Litecoin network is scheduled to produce 84 million currency units with a halving in reward every four years just like bitcoin. The coin was created by a Google employee, Charles Lee. Litecoin is in second spot to Bitcoin and has spawned numerous clones - however it has a solid base of support and dedicated development team.The Litecoin project is currently maintained by a core group of 6 software developers, led by Charles Lee, with a large community that is growing in support.In May 2017, Litecoin became the first of the Top 5 (By Market Cap) cryptocurrencies to implement the SegWit scaling solution. Later in May of the same year, the first Lightning Network transaction was completed through litecoin, transferring 0.00000001 LTC from Zurich to San Francisco in under one second.Blockchain data provided by: Blockchair (Main Source), CryptoID (Backup), and WhatToMine (Block Time only)Facebook | Instagram'
  },
  {
    logo: 'https://cryptocompare.com/media/37746245/bch.png',
    name: 'Bitcoin Cash',
    symbol: 'BCH',
    website: 'https://bitcoincash.org',
    launchdate: '2017-08-01',
    description: 'Bitcoin Cash (BCH) is a hard forked version of the original Bitcoin. It is similar to bitcoin with regards to its protocol; Proof of Work SHA-256 hashing, 21,000,000 supply, same block times and reward system. However two main differences are the the blocksize limits, as of August 2017 Bitcoin has a 1MB blocksize limit whereas BCH proposes 8MB blocks. Bitcoin Cash is a proposal from the viaBTC mining pool and the Bitmain mining group to carry out a UAHF (User Activated Hard Fork) on August 1st 12:20 pm UTC. They rejected the agreed consensus (aka BIP-91 or SegWit2x) and have decided to fork the original Bitcoin blockchain and create this new version called “Bitcoin Cash”. Bitcoin Cash can be claimed by BTC owners who have their private keys or store their Bitcoins on a service that will split BCH for the customer. On November 15, 2020, Bitcoin Cash experienced a scheduled upgrade. Bitcoin Cash developers from various full node projects changed the Difficulty Adjustment Algorithm (DAA) to a new DAA called ‘aserti3-2d‘ (or ‘ASERT’ for short).Blockchain data provided by: Blockchair (Main Source), WhatToMine (Block Time only)Facebook'
  },
  {
    logo: 'https://cryptocompare.com/media/37746242/link.png',
    name: 'Chainlink',
    symbol: 'LINK',
    website: 'https://chain.link',
    launchdate: '2017-09-19',
    description: 'Chainlink is a blockchain-base middleware, acting as a bridge between cryptocurrency smart contracts and off-chain resources like data feeds, various web APIs, and traditional bank account payments. This way, Chainlink allows Smart Contracts to communicate with external resources on their own. LINK is an ERC20 token based on the Ethereum Blockchain. It is used to pay Chainlink Node operators for the retrieval of data from off-chain data feeds, formatting of data into blockchain readable formats, off-chain computation, and uptime guarantees they provide as operators.Telegram | Discord | YouTube | WeChat | Kakao'
  }
]
