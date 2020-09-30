/**
 * Import of helproutes and declaration of Router Method
 */

const express = require('express');
const router = express.Router();
const fetch = require('./helproutes/fetch');
const authentication = require('./helproutes/rightAuthentication');
const redirect = require('./helproutes/redirect');


router.post("/setDeviceConstruction",redirect.redirectLogin, authentication.authRight(""),(req, res) => {
    console.log(req.body);
    fetch.postFetch("/api/commission/booking",req)
        .then(()=>{
        res.redirect("/commission");
    });

});

router.post("/setDeviceRepair",redirect.redirectLogin, authentication.authRight(""),(req, res) => {
    console.log(req.body);
    fetch.postFetch("/api/commission/maintenance",req)
        .then(()=>{
            res.redirect("/commission");
        });

});

router.post("/setDeviceWarehouse",redirect.redirectLogin, authentication.authRight(""),(req, res) => {
    console.log(req.body);
    fetch.postFetch("/api/commission/release",req)
        .then(()=>{
            res.redirect("/commission");
        });

});

module.exports = router;