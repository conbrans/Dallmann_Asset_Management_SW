const express = require('express');
const router = express.Router();
const redirect = require('../routes/redirect');
router.get("/home",redirect.redirectLogin, function (request,result)
{
    console.log("/home wurde aufgerufen");

    result.render('index.ejs',
        {
            benutzername: request.session.userName,
        });
});

module.exports = router;

