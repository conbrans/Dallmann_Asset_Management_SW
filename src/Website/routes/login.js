const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

var lifetime = 1000 * 60 * 60 * 24; //
var longLifetime = 1000 * 60 * 60 * 24 * 365;


var {
    PORT = 3000,
    sessionLifetime = lifetime,
    sessionName = "sid",
    secretSession = "test"
} = process.env;

/**
 * gets the User Information from REST-API
 * @returns {Promise<*>}
 */
async function getPermission() {
    //TODO fetch auf den Call von Rest-API umändern, im Moment nur ein Benutzerkonto in Gist

    // Admin Access https://gist.githubusercontent.com/conbrans/57fa107ff7dc3faa2e94f766ebbcf3c1/raw/94e6dd748fe9892cb973450cf11ffa9ec2a2b600/adminAccess
    // workshop Access https://gist.githubusercontent.com/conbrans/a54e7e3722567c5f4703792cba297d20/raw/f592e21d0d4fb89a0d1b4d6bcdbdccf501cf3bb3/workshopAccess
    // Polier Access https://gist.githubusercontent.com/conbrans/3b8eeb7650b8529e8a304232d3c17f2b/raw/e0bab66df786d390dabddaa00f6542afd11bf303/foremanAcces
    // Buchhaltung Access https://gist.githubusercontent.com/conbrans/0a255e9b53614ebcb70020e157b28364/raw/2cab92da92e7ffff7ea2197cb4776fcc2ad8d53f/accountingAccess


    let response = await fetch('https://gist.githubusercontent.com/conbrans/57fa107ff7dc3faa2e94f766ebbcf3c1/raw/94e6dd748fe9892cb973450cf11ffa9ec2a2b600/adminAccess');
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
    if (!data.access) {
        console.log("Zugang wurde verweigert");
        response.redirect("/");

    } else {
        request.session.userID = data.worker_id;
        request.session.userName = data.name + " " + data.surname;
        request.session.email = data.e_mail;
        request.session.role = data.role;

        if (request.body.checkbox === "on") {
            request.session.cookie.maxAge = longLifetime;
        } else {
            request.session.cookie.maxAge = lifetime;
        }
        ;
        response.redirect("/home");

    }
}


router.post("/login", function (request, response) {
    var result;
    //console.log(request.body)
    /*
    var jsonfetch = {
        "useremail" : request.body.useremail,
        "password" : request.body.password
    }
        fetch('',
        {
            method : 'PUT',
            headers :{
                'Content-Type' : 'application/json',
            },
            body: request.
        })*/


    getPermission()
        .then(data => getAcces(request, data, response));

});


module.exports = router;