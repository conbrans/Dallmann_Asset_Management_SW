const express = require('express');
const router = express.Router();
const redirect = require('../routes/redirect');


router.get("/add", redirect.redirectLogin, function (request, result) {
    result.render("adminCreateUser.ejs",
        {
            benutzername: request.session.userName,
            role: request.session.role,
            rights: request.session.rights,
        })

});


router.get("/booking", redirect.redirectLogin, function (request, response) {
    response.render("booking.ejs",
        {
            benutzername: request.session.userName,
            role: request.session.role,
            rights: request.session.rights,
            geraetenummer: "",
            minDate: "",
            maxDate: "",
        })

});
router.get("/bookinglist", redirect.redirectLogin, function (request, response) {
    response.render("bookinglist.ejs",
        {
            benutzername: request.session.userName,
            role: request.session.role,
            rights: request.session.rights,

        });
});

router.get("/devices", redirect.redirectLogin, function (request, response) {
    response.render("DeviceMngt.ejs",
        {
            benutzername: request.session.userName,
            role: request.session.role,
            rights: request.session.rights,

        })
});

router.get("/faQ", function (request, response) {
    response.render("FAQ.ejs",
        {
            benutzername: request.session.userName,
            role: request.session.role,
            rights: request.session.rights,
        });

});


router.get("/update", redirect.redirectLogin, function (request, response) {
    response.render("adminUpdateUser.ejs",
        {
            benutzername: request.session.userName,
            role: request.session.role,
            rights: request.session.rights,
        })

});


module.exports = router;