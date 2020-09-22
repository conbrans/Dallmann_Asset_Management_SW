const fetch = require('node-fetch');

/**
 * method for fetch task which need to be posted
 * @param url completes the fetch url
 * @param req contains the body, which has to be posted
 * @returns a json object
 */
async function postFetch(url, req)
{
    let res = await fetch("http://localhost:3000" + url,
        {
            method: 'POST',
            headers:  {"Content-Type": "application/json"},
            body: JSON.stringify(req.body)
        });
    return await res.json();
}
/**
 * method for fetch task which need to be put
 * @param url completes the fetch url
 * @param req contains the body, which has to be put
 * @returns a json object
 */
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

/**
 * method for fetch task, where something will be deleted
 * @param url completes the fetch url
 * @param req contains the body, which has to be deleted
 * @returns a json object
 */
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
/**
 * method specially written for the login
 * @param request contains a mail address, which tries to access the service
 * @param result contains a hashed password, which is compared in REST-Service
 * @returns a json object
 */
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

/**
 * method for an easy get fetch
 * @param url completes the url
 * @returns {Promise<*>}
 */
async function getFetch(url)
{
    let res = await fetch('http://localhost:3000' + url);
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