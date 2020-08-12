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


router.post("/login", function (request, response) {
    var result;
    var jsonfetch = {
        "useremail" : request.body.useremail,
        "password" : request.body.password
    }
        /*fetch('',
        {
            method : 'PUT',
            headers :{
                'Content-Type' : 'application/json',
            },
            body: request.
        })*/


    //TODO fetch auf den Call von Rest-API umändern, im Moment nur ein Benutzerkonto in Gist

    // Admin Access https://gist.githubusercontent.com/conbrans/57fa107ff7dc3faa2e94f766ebbcf3c1/raw/94e6dd748fe9892cb973450cf11ffa9ec2a2b600/adminAccess
    // workshop Access https://gist.githubusercontent.com/conbrans/a54e7e3722567c5f4703792cba297d20/raw/f592e21d0d4fb89a0d1b4d6bcdbdccf501cf3bb3/workshopAccess
    // Polier Access https://gist.githubusercontent.com/conbrans/3b8eeb7650b8529e8a304232d3c17f2b/raw/e0bab66df786d390dabddaa00f6542afd11bf303/foremanAcces
    // Buchhaltung Access https://gist.githubusercontent.com/conbrans/0a255e9b53614ebcb70020e157b28364/raw/2cab92da92e7ffff7ea2197cb4776fcc2ad8d53f/accountingAccess

    fetch(' https://gist.githubusercontent.com/conbrans/57fa107ff7dc3faa2e94f766ebbcf3c1/raw/94e6dd748fe9892cb973450cf11ffa9ec2a2b600/adminAccess')
        .then(response => response.json())
        .then(json => result = json);


    setTimeout(() => {
        //Zum Testen ob Zugriff verweigert wird
        //result.access= false;

        if (!result.access) {
            console.log("Zugang wurde verweigert");
            response.redirect("/");

        } else {
            request.session.userID = result.worker_id;
            request.session.userName = result.name + " " + result.surname;
            request.session.email = result.e_mail;
            request.session.role = result.role;
            //console.log(request.session);
            response.redirect("/home");
        }
    }, 500);
});


module.exports = router;