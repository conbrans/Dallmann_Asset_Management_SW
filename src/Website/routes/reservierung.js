const express = require('express');
const router = express.Router();
const fetch = require('./helproutes/fetch');
const authentication = require('./helproutes/rightAuthentication');

router.post("/booking", authentication.authRight("booking_device"),
    function (request, response) {
    response.render("booking.ejs",
        {
            benutzername: request.session.userName,
            role: request.session.role,
            rights: request.session.rights,
            geraetenummer: request.body.invNumber,
            maxDate: '2020-08-31',

        });
});

router.post("/book", authentication.authRight("booking_device"),
    function (request, response) {

    fetch.postFetch("book", request)
        .then(data => console.log(data))
        .catch((error) => {
            console.error('Error:', error);
        });
    response.redirect("/")

});

module.exports = router;