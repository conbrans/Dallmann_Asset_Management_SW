const express = require('express');
const fetch = require('node-fetch');
//const hash = require('./helproutes/passwordhashing');
const router = express.Router();


const lifetime = 1000 * 60 * 60 * 24;
const longLifetime = 1000 * 60 * 60 * 24 * 365;


/**
 * set the session Values
 * @param request
 * @param data
 * @param response
 */
function getAccess(request, data, response) {


    if (!data.access) {
        response.redirect("/");

    } else {
        console.log("Zugriff gewährt");
        request.session.userID = data.worker_id;
        request.session.userName = data.name + " " + data.surname;
        request.session.email = data.e_mail;
        request.session.role = data.role;
        request.session.rights = data.rights;
        request.session.notificationShown = false;
        request.session.bookingNotificationShown = false;
        request



        if (request.body.checkbox === "on") {
            request.session.cookie.maxAge = longLifetime;
        } else {
            request.session.cookie.maxAge = lifetime;
        }

        response.redirect("/home");

    }
}


router.post("/login", function (request, response) {

    // zur Verwendung wenn später in Rest bcyrpt läuft


    /*var hashedPassword = hash.hash(request.body.password)
        .then(function (result)
        {
            fetch('http://localhost:3032/json', {
                method : 'POST',
                headers: { "Content-Type": "application/json" },
                mode: 'cors',
                body: JSON.stringify({
                    usermail : request.body.useremail,
                    password : result,
                })
            })
                .then((response) => response.json())
                .then(data => getAccess(request,data,response))
                .catch((error) => {
                    console.error('Error:', error);
                });

        }
    )*/

    fetch('http://localhost:3032/json', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        mode: 'cors',
        body: JSON.stringify({
            usermail: request.body.useremail,
            password: request.body.password,
        })
    })
        .then((response) => response.json())
        .then(data => getAccess(request, data, response))
        .catch((error) => {
            console.error('Error:', error);
        });

});


module.exports = router;