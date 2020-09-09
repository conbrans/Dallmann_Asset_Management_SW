const fetch = require('node-fetch');

async function postFetch(url, req)
{
    let res = await fetch("http://localhost:3000" + url,
        {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            mode: 'cors',
            body: JSON.stringify(req.body)
        });
    return await res;
}

async function getFetch(name)
{
    let res = await fetch('http://localhost:3000' + name);
    return await res.json();
}

module.exports =
    {
        postFetch,
        getFetch,
    }