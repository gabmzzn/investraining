export class CryptoCompareAPI {

    constructor() { }

    async getHistorical(fsym: string, tsym: string, limit: number, timestamp: number, reference: string) {

        let url = 'https://min-api.cryptocompare.com/data/v2/histoday?fsym='
            + fsym + '&tsym=' + tsym + '&limit=' + limit
            + '&aggregate=1&toTs=' + timestamp
        // + '&api_key=6e659e1244d9e7ccf3b6bdf6ada561766883d528a2025f01004787c096d1b005'
        const json = await fetch(url).then(res => res.json())

        switch (reference) {
            // case 'average':
            //     let high = json.Data.Data.map((r: { high: any }) => r.high)
            //     let low = json.Data.Data.map((r: { low: any }) => r.low)
            //     let array: any = [], data: any = []
            //     for (let i = 0; i < limit; i++) {
            //         array[i] = (high[i] + low[i]) / 2
            //         data.push({ x: i, y: array[i] })
            //     }
            //     return data
            case 'high':
                return json.Data.Data.map((r: { time: any; high: any }) =>
                    Object.values({ time: r.time * 1000, high: r.high }))
            case 'low':
                return json.Data.Data.map((r: { time: any; low: any }) =>
                    Object.values({ time: r.time * 1000, low: r.low }))
            case 'open':
                return json.Data.Data.map((r: { time: any; open: any }) =>
                    Object.values({ time: r.time * 1000, open: r.open }))
            case 'close':
                return json.Data.Data.map((r: { time: any; close: any }) =>
                    Object.values({ time: r.time * 1000, close: r.close }))
            case 'complete':
                return json.Data.Data
        }
    }

    async getCoinList() {
        let url = 'https://min-api.cryptocompare.com/data/all/coinlist'
        const json = await fetch(url).then(res => res.json())
        let array = Object.entries(json.Data)
        return array
    }
}