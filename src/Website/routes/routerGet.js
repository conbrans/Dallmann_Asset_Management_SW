const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const redirect = require('../routes/redirect');

async function fetchValues(name)
{
    let response = await fetch('http://localhost:3032/'+name);
    let data = await response.json()
    return data;
}


router.get("/add", redirect.redirectLogin, function (request, response) {
    response.render("adminCreateUser.ejs",
        {
            benutzername: request.session.userName,
            role: request.session.role,
            rights: request.session.rights,
        })

});

router.get("/addDevice", redirect.redirectLogin, function (request, response) {
    response.sendFile("C:\\Users\\c.brans\\IdeaProjects\\Dallmann_Asset_Management_SW\\src\\Website\\private\\html\\addDevice.html");

});


router.get("/booking", redirect.redirectLogin, function (request, response) {
    response.render("booking.ejs",
        {
            benutzername: request.session.userName,
            role: request.session.role,
            rights: request.session.rights,
            geraetenummer: "",
            minDate: "",
            maxDate: "",
        })

});
router.get("/bookinglist", redirect.redirectLogin, function (request, response) {
    response.render("bookinglist.ejs",
        {
            benutzername: request.session.userName,
            role: request.session.role,
            rights: request.session.rights,

        });
});

router.get("/devices", redirect.redirectLogin, function (request, response) {
    fetchValues("devices")
        .then(data =>
        response.render("newDeviceManagement.ejs",
            {
                benutzername: request.session.userName,
                role: request.session.role,
                rights: request.session.rights,
                data : data,
            })
    );







   /* response.render("newDeviceManagement.ejs",
        {
            benutzername: request.session.userName,
            role: request.session.role,
            rights: request.session.rights,

        })*/
});

router.get("/faQ", function (request, response) {
    response.render("FAQ.ejs",
        {
            benutzername: request.session.userName,
            role: request.session.role,
            rights: request.session.rights,
        });

});

router.get("/profil",function (request,response)
{
    response.render("profil.ejs",
        {
            benutzername: request.session.userName,
            role: request.session.role,
            rights: request.session.rights,
        });

})


router.get("/update", redirect.redirectLogin, function (request, response) {
    response.render("adminUpdateUser.ejs",
        {
            benutzername: request.session.userName,
            role: request.session.role,
            rights: request.session.rights,
        })

});

router.get("/userManagement", redirect.redirectLogin, function (request,response)
{
    fetchValues("users")
        .then(data =>
            response.render("userManagement.ejs",
            {
                benutzername: request.session.userName,
                role: request.session.role,
                rights: request.session.rights,
                data: data,
            }));
});


module.exports = router;