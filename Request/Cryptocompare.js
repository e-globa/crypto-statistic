
module.exports = {
    coinListObj
};

function fetchJSON (url) {
    return fetch(url)
        .then(res => res.json())
        .then(body => {
            if (body.Response === 'Error') throw body.Message
            return body
        })
}

function coinListObj() {
    let url = `https://www.cryptocompare.com/api/data/coinlist`;
    return fetchJSON(url)
        .then(obj => {
            let data = obj.Data;
            let keys = Object.keys(data);
            let res = {};
            keys.forEach(i => {
                res[i] = 'https://www.cryptocompare.com' + data[i].ImageUrl;
            });
            return res;
        });
}
