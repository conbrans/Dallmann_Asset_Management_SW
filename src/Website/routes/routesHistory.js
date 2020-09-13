/**
 * Import of node packages and Modules
 */

const express = require('express');
const router = express.Router();
const redirect = require('./helproutes/redirect');
const authentication = require('./helproutes/rightAuthentication');
//const fetch = require('node-fetch');
const fetch = require('./helproutes/fetch');


router.post("/historie", redirect.redirectLogin,
    authentication.authRight("view_device"), function (req, res) {


        let datum = [];
        let latitude =[];
        let longitude =[];

        fetch.getFetch("/api/history/getHistoryForSpecificDevice/" + req.body.invNumber)
            .then(function (result) {
                console.log(result);
                for (let i = 0; i < result.length; i++) {
                    datum[i] = result[i].lastLocationUpdate;
                    latitude[i] = result[i].latitude;
                    longitude[i] = result[i].longitude;

                }
                res.render("historie.ejs", {
                    username: req.session.username,
                    role: req.session.role,
                    rights: req.session.rights,
                    geraetenummer: req.body.invNumber,
                    datum: datum,
                    longitude: longitude,
                    latitude:latitude
            })
});
})


module.exports = router;