const express = require('express');
const fetch = require('node-fetch');
const hash = require('./helproutes/passwordhashing');
const router = express.Router();

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
        request.session.userName =data.firstName + " " + data.surname;
        request.session.email = data.e_mail;
        request.session.role = data.role;
        request.session.rights = data.rights;
        request.session.loginShown = false;
        request.session.bookingShown = false;
        request.session.tuvUvvShown = false;
        request.session.maintenanceShown = false;



        if (request.body.checkbox === "on") {
            request.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 365;
        } else {
            request.session.cookie.maxAge =  1000 * 60 * 60 * 24;
        }

        response.redirect("/home");

    }
}


router.post("/login", function (request, response) {

    var hashedPassword = hash.hash(request.body.password)
        .then(function (result)
        {
            fetch('http://localhost:3000/api/login', {
                method : 'POST',
                headers: { "Content-Type": "application/json" },
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
        })
});


module.exports = router;