var Express = require("express");

var app = Express();
app.set('views', 'C:\\Users\\co99b\\IdeaProjects\\Dallmann_Asset_Management_SW\\src\\Website\\Views')
app.set('view engine', 'ejs');


app.get('/',
    (req, res) => {
        res.status(201).render("login.ejs");

    })

app.get("/logout",
    (req, res) => {
       /* req.session.destroy(err => {
            if (err) {
                return res.redirect("/home");
            }
            res.clearCookie(sessionName);*/
            res.status(302).redirect("/");
       // });
    });

app.get("/add",
    (req, res) => {

        res.status(200).render("adminCreateUser.ejs",
            {
                benutzername: "Teo Tester",
                role: "Tester",
                rights: {
                    booking_device: 0,
                    edit_device: 1,
                    add_device: 1,
                    view_device: 1,
                    delete_device: 1,
                    add_user: 1,
                    delete_user: 1,
                    edit_user: 1,
                    delete_booking: 1,
                    edit_booking: 1,
                    picking: 1
                },
            })

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
                benutzername: "Teo Tester",
                role: "Tester",
                rights: {
                    booking_device: 1,
                    edit_device: 1,
                    add_device: 1,
                    view_device: 1,
                    delete_device: 1,
                    add_user: 0,
                    delete_user: 1,
                    edit_user: 1,
                    delete_booking: 1,
                    edit_booking: 1,
                    picking: 1
                },
                geraetenummer: "",
                minDate: "",
                maxDate: "",
            })

    });
app.get("/bookinglist",
    (req, res) => {
        res.render("bookinglist.ejs",
            {
                benutzername: "Teo Tester",
                role: "Tester",
                rights: {
                    booking_device: 1,
                    edit_device: 1,
                    add_device: 1,
                    view_device: 1,
                    delete_device: 1,
                    add_user: 1,
                    delete_user: 1,
                    edit_user: 1,
                    delete_booking: 1,
                    edit_booking: 1,
                    picking: 0
                },

            });
    });

app.get("/devices",
    (req, res) => {
                res.render("newDeviceManagement.ejs",
                    {
                        benutzername: "Teo Tester",
                        role: "Tester",
                        rights: {
                            booking_device: 1,
                            edit_device: 1,
                            add_device: 1,
                            view_device: 0,
                            delete_device: 1,
                            add_user: 1,
                            delete_user: 1,
                            edit_user: 1,
                            delete_booking: 1,
                            edit_booking: 1,
                            picking: 1
                        },
                        data: [
                            {
                                inventoryNumber: '100420',
                                manufacturer: 'Makita',
                                model: 'Z350',
                                status: 'Verfügbar',
                                deviceCategorie: 'Winkelschleifer',
                                latitude: 52.52,
                                longtitude: 7.32
                            },
                            {
                                inventoryNumber: '100698',
                                manufacturer: 'DeWalt',
                                model: 'RTZ 2080',
                                status: 'Ausgeliehen',
                                deviceCategorie: 'Akkuflex',
                                latitude: 53.55,
                                longtitude: 9.99
                            },
                            {
                                inventoryNumber: '100365',
                                manufacturer: 'Hilti',
                                model: 'Plattmacher',
                                status: 'Reperatur',
                                deviceCategorie: 'Rüttelplatte',
                                latitude: 52.41,
                                longtitude: 7.97
                            },
                            {
                                inventoryNumber: '100815',
                                manufacturer: 'Stihl',
                                model: 'Staubmacher 4000',
                                status: 'Geklaut',
                                deviceCategorie: 'Kettensäge',
                                latitude: 53.55,
                                longtitude: 9.99
                            }
                        ]

                    });
    });

app.get("/faQ",
    (req, res) => {
        res.render("FAQ.ejs",
            {
                benutzername: "Teo Tester",
                role: "Tester",
                rights: {
                    booking_device: 1,
                    edit_device: 1,
                    add_device: 1,
                    view_device: 1,
                    delete_device: 1,
                    add_user: 1,
                    delete_user: 1,
                    edit_user: 1,
                    delete_booking: 1,
                    edit_booking: 1,
                    picking: 1
                },
            });

    });

app.get("/home",
    (req, res) => {

        res.status(200).render('index.ejs',
            {
                benutzername: "Teo Tester",
                role: "Tester",
                rights: {
                    booking_device: 1,
                    edit_device: 1,
                    add_device: 1,
                    view_device: 1,
                    delete_device: 1,
                    add_user: 1,
                    delete_user: 1,
                    edit_user: 1,
                    delete_booking: 1,
                    edit_booking: 1,
                    picking: 1
                },
                req : req,
            });
    });

app.get("/profil", (req, res) => {
    res.render("profil.ejs",
        {
            benutzername: "Teo Tester",
            role: "Tester",
            rights: {
                booking_device: 1,
                edit_device: 1,
                add_device: 1,
                view_device: 1,
                delete_device: 1,
                add_user: 1,
                delete_user: 1,
                edit_user: 1,
                delete_booking: 1,
                edit_booking: 1,
                picking: 1
            },
        });

});


app.get("/update",
    (req, res) => {
        res.render("adminUpdateUser.ejs",
            {
                benutzername: "Teo Tester",
                role: "Tester",
                rights: {
                    booking_device: 1,
                    edit_device: 1,
                    add_device: 1,
                    view_device: 1,
                    delete_device: 1,
                    add_user: 1,
                    delete_user: 1,
                    edit_user: 1,
                    delete_booking: 1,
                    edit_booking: 1,
                    picking: 1
                },
            })

    });

app.get("/userManagement",
    (req, res) => {
                res.render("userManagement.ejs",
                    {
                        benutzername: "Teo Tester",
                        role: "Tester",
                        rights: {
                            booking_device: 1,
                            edit_device: 1,
                            add_device: 1,
                            view_device: 1,
                            delete_device: 1,
                            add_user: 1,
                            delete_user: 1,
                            edit_user: 1,
                            delete_booking: 1,
                            edit_booking: 1,
                            picking: 1
                        },
                        data: [
                            {
                                "worker_id": 2,
                                "password": "123456",
                                "e_mail": "admin@dallmann-bau.de",
                                "user_identification": "admin",
                                "name": " Superadmin",
                                "surname": " Adminsitration",
                                "role": "Admin"
                            },
                            {
                                "worker_id": 3,
                                "password": "123456",
                                "e_mail": "c.brans@dallmann-bau.de",
                                "user_identification": "c.brans@dallmann-bau.de",
                                "name": "Constantin",
                                "surname": "Brans",
                                "role": "Admin"
                            },
                            {
                                "worker_id": 5,
                                "password": "123456",
                                "e_mail": "s.petersen@dallmann-bau.de",
                                "user_identification": "s.petersen@dallmann-bau.de",
                                "name": "Sven",
                                "surname": "Petersen",
                                "role": "Werkstatt"
                            },
                            {
                                "worker_id": 6,
                                "password": "123456",
                                "e_mail": "d.dziersan@dallmann-bau.de",
                                "user_identification": "l.kottmann@dallmann-bau.de",
                                "name": "Dominik",
                                "surname": "Dziersan",
                                "role": "Polier"
                            },
                            {
                                "worker_id": 12,
                                "password": "123456",
                                "e_mail": "c.brans@dallmann-bau.de",
                                "user_identification": "c.brans@dallmann-bau.de",
                                "name": "Carsten",
                                "surname": "Brans",
                                "role": "Admin"
                            }
                        ]
                    });
    })

var server = app.listen(3000, () => {
});

module.exports = server;