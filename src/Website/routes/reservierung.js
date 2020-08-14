const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const redirect = require('../routes/redirect');

router.post("/booking",/* redirect.redirectHomeAdmin,redirect.redirectHomeForeman,redirect.redirectHomeWorkshop,*/ function (request, response) {



    response.render("booking.ejs",
        {
            benutzername: request.session.userName,
            role: request.session.role,
            rights: request.session.rights,
            geraetenummer: request.body.invNumber,
            minDate : '2020-08-14',
            maxDate : '2020-08-16',

        })
})


router.post("/book", function (request, response) {
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