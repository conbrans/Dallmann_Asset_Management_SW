const express = require('express');
const router = express.Router();

router.get("/index", function (request,result)
{
    result.render('index.ejs');
});

module.exports = router;

