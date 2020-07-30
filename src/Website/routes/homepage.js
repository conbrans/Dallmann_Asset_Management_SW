const express = require('express');
const router = express.Router();

router.get("/index", function (request,response)
{
    response.sendFile("C:\\Users\\c.brans\\IdeaProjects\\Dallmann_Asset_Management_SW\\src\\Website\\Views\\index.html");
});

module.exports = router;

