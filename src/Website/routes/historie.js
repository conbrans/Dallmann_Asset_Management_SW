const express = require('express');
const router = express.Router();


router.get("/historie", function (request,result)
{
    result.render("historie.ejs");
});


module.exports = router;