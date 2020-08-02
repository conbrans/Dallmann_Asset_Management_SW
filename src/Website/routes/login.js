const express = require('express');
const router = express.Router();


router.get("/", function (request,result)
{
    result.render("login.ejs");
});


module.exports = router;