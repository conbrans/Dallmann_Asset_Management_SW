const express = require('express');
const router = express.Router();
const app = require('../../app');

router.get("/add", function (request,result)
{
    result.render("adminCreateUser.ejs",
        {
            benutzername : "Testname",
        })

});

router.post("/addUser", function (request)
{

});

module.exports = router;