/**
 * Import of node packages and Modules
 */
const express = require('express');
const router = express.Router();
const fetch = require('./helproutes/fetch');
const authentication = require('./helproutes/rightAuthentication');

router.post("/booking",
    authentication.authRight("booking_device"),(req, res)=> {
    res.render("booking.ejs",
        {
            username: req.session.username,
            role: req.session.role,
            rights: req.session.rights,
            inventoryNumber : req.body.inventoryNumber,
            maxDate: '2020-08-31',
        });
});

router.post("/book", authentication.authRight("booking_device"), (req, res)=> {

    fetch.postFetch("book", req)
        .then(data => console.log(data))
        .catch((error) => {
            console.error('Error:', error);
        });
    res.redirect("/")

});

module.exports = router;