const express = require('express');
const router = express.Router();
const fetch = require('./fetch');
const redirect = require('./redirect');

router.get('/', redirect.redirectHome, function (request, response) {
    response.render("login.ejs");

})

router.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect("/home");
        }
        res.clearCookie(sessionName);
        console.log("Cookie wurde zerstört");
        res.redirect("/");
    })
})




router.get("/add", redirect.redirectLogin, redirect.authRight("add_User"), function (request, response) {
    response.render("adminCreateUser.ejs",
        {
            benutzername: request.session.userName,
            role: request.session.role,
            rights: request.session.rights,
        })

});

router.get("/addDevice", redirect.redirectLogin, redirect.authRight("add_Device"), function (request, response) {
    response.sendFile("C:\\Users\\c.brans\\IdeaProjects\\Dallmann_Asset_Management_SW\\src\\Website\\private\\html\\addDevice.html");

});


router.get("/booking", redirect.redirectLogin, redirect.authRight("booking_device"), function (request, response) {
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
router.get("/bookinglist", redirect.redirectLogin, redirect.authRight("booking_device"), function (request, response) {
    response.render("bookinglist.ejs",
        {
            benutzername: request.session.userName,
            role: request.session.role,
            rights: request.session.rights,

        });
});

router.get("/devices", redirect.redirectLogin, redirect.authRight("view_device"), function (request, response) {
    fetch.getFetch("devices")
        .then(data =>
            response.render("newDeviceManagement.ejs",
                {
                    benutzername: request.session.userName,
                    role: request.session.role,
                    rights: request.session.rights,
                    data: data,
                })
        );
});

router.get("/faQ", function (request, response) {
    response.render("FAQ.ejs",
        {
            benutzername: request.session.userName,
            role: request.session.role,
            rights: request.session.rights,
        });

});

router.get("/home",redirect.redirectLogin, function (request,response)
{

    response.render('index.ejs',
        {
            benutzername: request.session.userName,
            role : request.session.role,
            rights: request.session.rights,
        });
});

router.get("/profil", function (request, response) {
    response.render("profil.ejs",
        {
            benutzername: request.session.userName,
            role: request.session.role,
            rights: request.session.rights,
        });

})


router.get("/update", redirect.redirectLogin, redirect.authRight("add_user"),function (request, response) {
    response.render("adminUpdateUser.ejs",
        {
            benutzername: request.session.userName,
            role: request.session.role,
            rights: request.session.rights,
        })

});

router.get("/userManagement", redirect.redirectLogin, redirect.authRight("add_user"),redirect.authRight("delete_User"), function (request, response) {
    fetch.getFetch("users")
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