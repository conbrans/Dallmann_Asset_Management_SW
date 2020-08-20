const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const redirect = require('../routes/redirect');

router.post("/booking", redirect.authRight("booking_device"), function (request, response) {


    response.render("booking.ejs",
        {
            benutzername: request.session.userName,
            role: request.session.role,
            rights: request.session.rights,
            geraetenummer: request.body.invNumber,
            maxDate : '2020-08-31',

        })
})


router.post("/book", redirect.authRight("booking_device"), function (request, response) {
    //TODO FETCH ZUR KEVIN
console.log(request.body);
var jsonfetch = {
    "device_num" : request.body.Gerätenummer,
    "booking-start" : request.body.booking_start,
    "booking-end" : request.body.booking_end,
    "borrower" : request.body.borrower,
}

console.log(jsonfetch);
    /*
        fetch('',
        {
            method : 'PUT',
            headers :{
                'Content-Type' : 'application/json',
            },
            body: jsonfetch
        })*/

});

module.exports = router;