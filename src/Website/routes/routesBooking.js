/**
 * Import of node packages and Modules
 */
const express = require('express');
const router = express.Router();
const fetch = require('./helproutes/fetch');
const authentication = require('./helproutes/rightAuthentication');

router.post("/booking",
    authentication.authRight("booking_device"),(req, res)=> {
    res.render("booking.ejs", {
            username: req.session.username,
            role: req.session.role,
            rights: req.session.rights,
            inventoryNumber : req.session.inventoryNumber,
            maxDate: '2020-08-31',
        });
});

router.post("/book", authentication.authRight("booking_device"), (req, res)=> {
    let tobetransformed = req.body.loanEndloanDay;

    req.body.workerId = req.session.userID;
    req.body.projectId = "test";
    console.log(req.body);
    console.log(tobetransformed);

});

module.exports = router;