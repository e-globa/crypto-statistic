module.exports = {
    getCoinList
};
import {IMGS} from './Cryptocompare';

function fetchJSON (url) {
    return fetch(url)
        .then(res => res.json())
        .then(body => {
            if (body.Response === 'Error') throw body.Message
            return body
        })
}

function getCoinList() {
    /*{
        "id": "bitcoin",
        "name": "Bitcoin",
        "symbol": "BTC",
        "rank": "1",
        "price_usd": "9010.92",
        "price_btc": "1.0",
        "24h_volume_usd": "4556070000.0",
        "market_cap_usd": "150502863843",
        "available_supply": "16702275.0",
        "total_supply": "16702275.0",
        "max_supply": "21000000.0",
        "percent_change_1h": "0.21",
        "percent_change_24h": "5.92",
        "percent_change_7d": "15.94",
        "last_updated": "1511697251",
        "img": asdfjasdjfi
    }*/

    // https://www.cryptocompare.com/media/20646/eth_logo.png
    //?start=0&limit=100

    return fetchJSON('https://api.coinmarketcap.com/v1/ticker/?start=0&limit=100')
        .then(arr => {
            return arr.map(i => {

                // i["imgUrl"] = IMGS[i["symbol"]];
                // i["isFavorite"] = false;
                return i;
            })
        });
}