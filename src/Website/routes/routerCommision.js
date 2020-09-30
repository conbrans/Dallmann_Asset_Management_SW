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
    /*fetch.postFetch("").then(()=>{
        res.redirect("/commission");
    })*/

});

router.post("/setDeviceRepair",redirect.redirectLogin, authentication.authRight(""),(req, res) => {
    console.log(req.body);

});

router.post("/setDeviceWarehouse",redirect.redirectLogin, authentication.authRight(""),(req, res) => {
    console.log(req.body);
});

module.exports = router;