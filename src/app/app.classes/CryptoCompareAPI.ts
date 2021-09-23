export class CryptoCompareAPI {

    constructor() { }

    async getHistorical(fsym: string, tsym: string, limit: number, timestamp: number, reference: string) {

        let url = 'https://min-api.cryptocompare.com/data/v2/histoday?fsym='
            + fsym + '&tsym=' + tsym + '&limit=' + limit
            + '&aggregate=1&toTs=' + timestamp //+ '&api_key=' + APIKey

        const json = await fetch(url).then(res => res.json())

        if (reference == 'high') {
            return json.Data.Data.map((a: { high: any }) => a.high)
        }
        else if (reference == 'low') {
            return json.Data.Data.map((b: { low: any }) => b.low)
        }
        else if (reference == 'average') {
            let high = json.Data.Data.map((a: { high: any }) => a.high)
            let low = json.Data.Data.map((b: { low: any }) => b.low)
            let array: any[] = []

            for (let i = 0; i < high.length; i++) {
                array[i] = (high[i] + low[i]) / 2
            }

            let data: any = []

            for (let i = 0; i < limit; i++) {
                data.push({ x: i, y: array[i] })
            }

            return data
        }
    }

    async getCoinList() {

        let url = 'https://min-api.cryptocompare.com/data/all/coinlist'
        const json = await fetch(url).then(res => res.json())

        let array = Object.entries(json.Data)

        return array

    }
}