/**
 * Import of node packages and Modules
 */
const express = require('express');
const fetch = require('./helproutes/fetch');
const hash = require('./helproutes/passwordhashing');
const router = express.Router();

/**
 * set the session Values
 * @param req
 * @param data
 * @param res
 */
function getAccess(req, data, res) {

    if (!data.access) {
        res.redirect("/failedLogin");

    } else {
        console.log("Zugriff gewährt");
        req.session.userID = data.worker_id;
        req.session.username =data.firstName + " " + data.surname;
        req.session.email = data.e_mail;
        req.session.role = data.role;
        req.session.rights = data.rights;
        req.session.loginShown = false;
        req.session.bookingShown = false;
        req.session.tuvUvvShown = false;
        req.session.maintenanceShown = false;

        if (req.body.checkbox === "on") {
            req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 365;
        } else {
            req.session.cookie.maxAge =  1000 * 60 * 60 * 24;
        }

        res.redirect("/home");
    }
}


router.post("/login", function (req, res) {

    var hashedPassword = hash.hash(req.body.password)
        .then(function (result)
        {
            fetch.loginFetch(req,result)
                .then(data => getAccess(req,data,res))
                .catch((error) => {
                    console.error('Error:', error);
                });
        })
});


module.exports = router;