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
        req.session.tuvShown = false;
        req.session.UVVShown = false;
        req.session.maintenanceShown = false;

        req.session.cookie.maxAge = req.body.checkbox === "on" ?
            longLifeTime :
            normalLifeTime;
        getNotificationValues(req, data, res);

    }
}

function getNotificationValues(req, data, res) {
    fetch.getFetch("/api/notification/booking/" + data.worker_id)
        .then(result => req.session.bookingData = result)
        .then(() => {
            fetch.getFetch("/api/notification/tuv")
                .then(result => req.session.tuvData = result)
                .then(() => {
                    fetch.getFetch("/api/notification/uvv")
                        .then(result => req.session.uvvData = result)
                        .then(() => {
                            fetch.getFetch("/api/notification/maintenance")
                                .then(result => req.session.maintenanceData = result)
                                .then(() => {
                                    console.log(req.session);
                                    res.redirect("/home");
                                });
                        });
                });
        });
}


/**
 * send the login values to REST, the password is hashed and compared in REST
 */
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