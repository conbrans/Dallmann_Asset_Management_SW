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
        let latitude = [];
        let longitude = [];
        let model = [];
        let manufacturer = [];
        let serialNumber = [];
        let guarantee = [];
        let note = [];
        let statusDescription = [];
        let category = [];
        let lastTuev = [];
        let lastUvv = [];
        let lastRepair = [];
        let repairNote = [];
        let projectId = [];
        let buildingSite = [];
        /*let postcode = [];
        let city = [];*/



        fetch.getFetch("/api/history/getHistoryForSpecificDevice/" + req.session.inventoryNumber)
            .then(function (result) {
                for (let i = 0; i < result.length; i++) {
                    datum[i] = result[i].lastChange;
                    latitude[i] = result[i].latitude;
                    longitude[i] = result[i].longitude;
                    model[i] = result[i].model;
                    manufacturer[i]= result[i].manufacturer;
                    serialNumber[i]= result[i].serialNumber;
                    guarantee[i]=result[i].guarantee;
                    note[i]= result[i].note;
                    statusDescription[i]=result[i].statusDescription;
                    category[i]= result[i].category;
                    lastTuev[i]= result[i].lastTuev;
                    lastUvv[i]= result[i].lastUvv;
                    lastRepair[i]= result[i].lastRepair;
                    repairNote[i]= result[i].repairNote;
                    projectId[i]= result[i].projectId;
                    buildingSite[i]= result[i].buildingSite;
                    /*postcode[i]= result[i].postcode;
                    city[i]= result[i].city;*/
                }
                res.render("historie.ejs", {
                    username: req.session.username,
                    role: req.session.role,
                    rights: req.session.rights,
                    geraetenummer: req.body.invNumber,
                    datum: datum,
                    longitude: longitude,
                    latitude: latitude,
                    model: model,
                    manufacturer:manufacturer,
                    serialNumber : serialNumber,
                    guarantee : guarantee,
                    note : note,
                    statusDescription : statusDescription,
                    category : category,
                    lastTuev : lastTuev,
                    lastUvv : lastUvv,
                    lastRepair : lastRepair,
                    repairNote : repairNote,
                    projectId : projectId,
                    buildingSite : buildingSite,
                    /*postcode : postcode,
                    city : city,*/
                })
            });
    })

module.exports = router;