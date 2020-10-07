/**
 * Import of node packages and Modules
 */
const express = require('express');
const router = express.Router();
const redirect = require('./helproutes/redirect');
const authentication = require('./helproutes/rightAuthentication');
const fetch = require('./helproutes/fetch');
const reformatDate = require('./helproutes/reformatDate');

router.post("/historie", redirect.redirectLogin,
    authentication.authRight("view_device"), (req, res) => {
        res.render("historie.ejs", {
            username: req.session.username,
            role: req.session.role,
            rights: req.session.rights,
            inventoryNumber: req.session.inventoryNumber,
        })
    });

router.get("/showHistory",redirect.redirectLogin,
    authentication.authRight("view_device"), (req,res)=>{
    fetch.getFetch("/api/history/getHistoryForSpecificDevice/"
        + req.session.inventoryNumber)
        .then(data => {
            reformatDate.removeTimeStampForHistory(data)
                .then(data => res.json(data))});
    }

)


module.exports = router;