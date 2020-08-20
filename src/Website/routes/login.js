const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();


var lifetime = 1000 * 60 * 60 * 24;
var longLifetime = 1000 * 60 * 60 * 24 * 365;
var {
    PORT = 3000,
    sessionLifetime = lifetime,
    sessionName = "sid",
    secretSession = "test"
} = process.env;


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
        request.session.rights = data.rights;
        console.log(data.rights);


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
        method : 'POST',
        headers: { "Content-Type": "application/json" },
        mode: 'cors',
        body: JSON.stringify({
            usermail : request.body.useremail,
            password : request.body.password,
        })
    })
        .then((response) => response.json())
        .then(data => getAcces(request,data,response))
        .catch((error) => {
        console.error('Error:', error);
    });
});


module.exports = router;