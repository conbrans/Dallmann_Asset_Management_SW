const express = require('express');
const router = express.Router();
const app = require('../../app');
const redirect = require('../routes/redirect');


router.post("/updateUser", redirect.authRight("edit_user"), function (request,response)
{
    console.log(request.body);
   /* response.render("adminCreateUser.ejs",
        {
            benutzername: request.session.userName,
            role : request.session.role,
            rights: request.session.rights,
        })*/
});

module.exports = router;