const express = require('express');
const router = express.Router();


router.get("/historie", function (request,response)
{
    response.sendFile("C:\\Users\\c.brans\\IdeaProjects\\Dallmann_Asset_Management_SW\\src\\Website\\Views\\Historie.html");
});


module.exports = router;