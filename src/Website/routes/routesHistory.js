/**
 * Import of node packages and Modules
 */

const express = require('express');
const router = express.Router();
const redirect = require('./helproutes/redirect');
const authentication = require('./helproutes/rightAuthentication');
const fetch = require('node-fetch');
// const fetch = require('./helproutes/fetch');


router.post("/historie", redirect.redirectLogin,
   authentication.authRight("view_device"), function (req, res) {



    let datum = [];
    let bauId = [];
    let bauBZ = [];
    let standort = [];
    let vorStandort = [];

     fetch.getFetch("/api/history/getHistoryForSpecificDevice/"+req.body.invNumber)
         .then(
             data => console.log(data))


    /*fetch('https://gist.githubusercontent.com/conbrans/88140516ddcb3421fa8d4d441669f71b/raw/308ac59f6c492a796b26865a301a68f73f0b8e25/hsitorie')
        .then(response => response.json())
        .then(json => result = json);

    setTimeout(() => {
        for (let i = 0; i < result.length; i++) {
            datum[i] = result[i].date;
            bauId[i] = result[i].bau_ID;
            bauBZ[i] = result[i].bauBz;
            standort[i] = result[i].location;
            vorStandort[i] = result[i].lastLocation;
        }

        res.render("historie.ejs",
            {
                username: req.session.username,
                role: req.session.role,
                rights: req.session.rights,
                geraetenummer: req.body.invNumber,
                datum: datum,
                bau_ID: bauId,
                bauBZ: bauBZ,
                location: standort,
                lastLocation: vorStandort,
            });

    }, 1000);*/


});


module.exports = router;