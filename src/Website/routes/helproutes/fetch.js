const fetch = require('node-fetch');

async function postFetch(url,request)
{
    let response = await fetch("http://localhost:3032/"+ url,{
        method : 'POST',
        headers: { "Content-Type": "application/json" },
        mode: 'cors',
        body: JSON.stringify(request.body)
    });
    let data = await response.json();
    return data;

}
async function getFetch(name) {
    let response = await fetch('http://localhost:3032/' + name);
    let data = await response.json()
    return data;
}




module.exports =
    {
        postFetch,
        getFetch

    }