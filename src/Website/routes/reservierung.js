const express = require('express');
const router = express.Router();
const app = require('../../app');
const redirect = require('../routes/redirect');

router.post("/booking", function (request, response) {
    response.render("booking.ejs",
        {
            benutzername: request.session.userName,
            role: request.session.role,
            rights: request.session.rights,
            geraetenummer: request.body.invNumber,
        })
})


router.post("/book", function (request, response) {
    console.log(request.body);

});

module.exports = router;