var Express = require("express");

var app = Express();
app.set('views', 'src/Website/Views');
app.set('view engine', 'ejs');


app.get('/',
    (req, res) => {
        res.render("login.ejs");
        res.status(200).send();

    })

app.get("/logout",
    (req, res) => {
        res.status(200).send();
        req.session.destroy(err => {
            if (err) {
                return res.redirect("/home");
            }
            res.clearCookie(sessionName);
            res.redirect("/");
        });
    });

app.get("/add",
    (req, res) => {

        res.status(200).send();
       /* res.render("adminCreateUser.ejs",
            {
                benutzername: req.session.userName,
                role: req.session.role,
                rights: req.session.rights,
            })*/

    });

app.get("/addDevice", (res) => {
        res.sendFile("C:\\Users\\c.brans\\IdeaProjects\\" +
            "Dallmann_Asset_Management_SW\\src\\Website\\private\\" +
            "html\\addDevice.html");

    });


app.get("/booking",
    (req, res) => {
        res.render("booking.ejs",
            {
                benutzername: req.session.userName,
                role: req.session.role,
                rights: req.session.rights,
                geraetenummer: "",
                minDate: "",
                maxDate: "",
            })

    });
app.get("/bookinglist",
    (req, res) => {
        res.render("bookinglist.ejs",
            {
                benutzername: req.session.userName,
                role: req.session.role,
                rights: req.session.rights,

            });
    });

app.get("/devices",
    (req, res) => {
        fetch.getFetch("devices")
            .then(data =>
                res.render("newDeviceManagement.ejs",
                    {
                        benutzername: req.session.userName,
                        role: req.session.role,
                        rights: req.session.rights,
                        data: data,
                    })
            );
    });

app.get("/faQ",
    (req, res) => {
        res.render("FAQ.ejs",
            {
                benutzername: req.session.userName,
                role: req.session.role,
                rights: req.session.rights,
            });

    });

app.get("/home",
    (req, res) => {

        res.render('index.ejs',
            {
                benutzername: req.session.userName,
                role: req.session.role,
                rights: req.session.rights,
                req : req,
            });
    });

app.get("/profil", (req, res) => {
    res.render("profil.ejs",
        {
            benutzername: req.session.userName,
            role: req.session.role,
            rights: req.session.rights,
        });

});


app.get("/update",
    (req, res) => {
        res.render("adminUpdateUser.ejs",
            {
                benutzername: req.session.userName,
                role: req.session.role,
                rights: req.session.rights,
            })

    });

app.get("/userManagement",
    (req, res) => {
        fetch.getFetch("users")
            .then(data =>
                res.render("userManagement.ejs",
                    {
                        benutzername: req.session.userName,
                        role: req.session.role,
                        rights: req.session.rights,
                        data: data,
                    }));
    })

var server = app.listen(3000, () => {
    console.log("Listening on port " + server.address().port + "...");
});

module.exports = server;
;