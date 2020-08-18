const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();


var lifetime = 1000 * 60 * 60 * 24;
var longLifetime = 1000 * 60 * 60 * 24 * 365;


/**
 * gets the User Information from REST-API
 * @returns {Promise<*>}
 */
async function getPermission() {

    // Admin Access https://gist.githubusercontent.com/conbrans/57fa107ff7dc3faa2e94f766ebbcf3c1/raw/f1594e95bae66b6f91642bdc1f89727a09d52c49/adminAccess
    // workshop Access https://gist.githubusercontent.com/conbrans/a54e7e3722567c5f4703792cba297d20/raw/ed442ea97c45f80aa12616cd89810c6637322bea/workshopAccess
    // Polier Access https://gist.githubusercontent.com/conbrans/3b8eeb7650b8529e8a304232d3c17f2b/raw/4779f3ebd0f7cbc966e87151f0df8a79135e43c0/foremanAcces
    // Buchhaltung Access https://gist.githubusercontent.com/conbrans/0a255e9b53614ebcb70020e157b28364/raw/f03f13f7027840fe38a232dfa6762b1f04877178/accountingAccess


    let response = await fetch('https://gist.githubusercontent.com/conbrans/57fa107ff7dc3faa2e94f766ebbcf3c1/raw/f1594e95bae66b6f91642bdc1f89727a09d52c49/adminAccess');
    return await response.json();
}

/**
 * set the session Values
 * @param request
 * @param data
 * @param response
 */
function getAcces(request, data, response) {
    //Zum Testen ob Zugriff verweigert wird
    // data.access= false;

    //console.log(data);
    if (!data.access) {
        console.log("Zugang wurde verweigert");
        response.redirect("/");

    } else {
        request.session.userID = data.worker_id;
        request.session.userName = data.name + " " + data.surname;
        request.session.email = data.e_mail;
        request.session.role = data.role;
        request.session.rights = data.rights;

        //console.log(request.session)

        if (request.body.checkbox === "on") {
            request.session.cookie.maxAge = longLifetime;
        } else {
            request.session.cookie.maxAge = lifetime;
        }

        response.redirect("/home");

    }
}




router.post("/login", function (request, response) {
    fetch('http://localhost:3032/json', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        mode: 'cors',
        body: JSON.stringify({
            usermail : request.body.useremail,
            password : request.body.password,
        })
    })
        .then((response) => {
            console.log(response);
           /* getPermission()
                .then(data => getAcces(request,data,response));*/
        }).catch((error) => {
        console.error('Error:', error);
    });


       /* {
            method: 'POST', // or 'PUT'
            headers: {
                'Accept' : 'application/xhtml',
                'Content-Type': 'application/xhtml',
            },
            body: JSON.stringify(data)
        }).then((response)=>
        {
            console.log(response.body);

        });*/


    getPermission()
        .then(data => getAcces(request, data, response));

});


module.exports = router;