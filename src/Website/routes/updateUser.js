const express = require('express');
const router = express.Router();
const app = require('../../app');
const redirect = require('../routes/redirect');


router.post("/updateUser", function (request,result)
{
    console.log(request.body);
   /* result.render("adminCreateUser.ejs",
        {
            benutzername: request.session.userName,
            role : request.session.role,
            rights: request.session.rights,
        })*/
});

module.exports = router;