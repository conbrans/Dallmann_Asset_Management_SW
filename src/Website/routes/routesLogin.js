/**
 * Import of node packages and Modules
 */
const express = require('express');
const fetch = require('./helproutes/fetch');
const hash = require('./helproutes/passwordhashing');
const router = express.Router();

const {
    normalLifeTime = 1000 * 60 * 60 * 24,
    longLifeTime = 1000 * 60 * 60 * 24 * 365,

} = process.env;

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
        req.session.userID = data.worker_id;
        req.session.username = data.firstName + " " + data.surname;
        req.session.firstname = data.firstName;
        req.session.surname = data.surname;
        req.session.email = data.e_mail;
        req.session.role = data.role;
        req.session.rights = data.rights;
        req.session.loginShown = false;
        req.session.bookingShown = false;
        req.session.tuvUvvShown = false;
        req.session.maintenanceShown = false;

        req.session.cookie.maxAge = req.body.checkbox === "on" ?
            longLifeTime :
            normalLifeTime;

        res.redirect("/home");
    }
}

router.post("/login", function (req, res) {

    var hashedPassword = hash.hash(req.body.password)
        .then(function (result) {
            fetch.loginFetch(req, result)
                .then(data => getAccess(req, data, res))
                .catch((error) => {
                    console.error('Error:', error);
                });
        })
});


module.exports = router;