const fetch = require('node-fetch');

const options = {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    mode: 'cors',

};

async function postFetch(url, request) {
    let response = await fetch("http://localhost:3032/" + url, options,
        {
            body: JSON.stringify(request.body)
        }
    );
    return await response.json();

}

async function getFetch(name) {
    let response = await fetch('http://localhost:3032/' + name);
    return await response.json();
}


module.exports =
    {
        postFetch,
        getFetch
    }