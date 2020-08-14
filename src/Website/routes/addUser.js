const express = require('express');
const router = express.Router();
const app = require('../../app');
const redirect = require('../routes/redirect');

router.post("/addUser", redirect.redirectHomeAdmin, function (request)
{
    console.log(request.body);

});

module.exports = router;