const fetch = require('node-fetch');

const options = {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    mode: 'cors',

};

async function postFetch(url, req) {
    let res = await fetch("http://localhost:3032/" + url, options,
        {
            body: JSON.stringify(req.body)
        }
    );
    return await res.json();

}

async function getFetch(name) {
    let res = await fetch('http://localhost:3032/' + name);
    return await res.json();
}


module.exports =
    {
        postFetch,
        getFetch
    }