const fetch = require('node-fetch');

async function postFetch(url, req)
{
    let res = await fetch("http://localhost:3000" + url,
        {
            method: 'POST',
            headers: headers,
            body: JSON.strigify(req.body)
        });
    return await res.json();
}

async function putFetch(url, req)
{
    let res = await fetch("http://localhost:3000" + url,
        {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(req.body)
        });
    return await res.json();
}


async function deleteFetch(url, req)
{
    let res = await fetch("http://localhost:3000" + url,
        {
            method: 'DELETE',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(req.body)
        });
    return res.json();
}

async function loginFetch(request,result)
{
    let res = await fetch('http://localhost:3000/api/login',
        {
            method : 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                usermail : request.body.useremail,
                password : result,
            })
        });
    return res.json();
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
        putFetch,
        deleteFetch,
        loginFetch
    }