var Express = require("express");
var app = Express();
app.set('views', 'C:\\Users\\co99b\\IdeaProjects\\Dallmann_Asset_Management_SW\\src\\Website\\Views')
app.set('view engine', 'ejs');

app.post("/historie", function (request, response) {


        let datum = [];
        let bauId = [];
        let bauBZ = [];
        let standort = [];
        let vorStandort = [];

        /* fetch.getFetch("")
             .then(
                 data => result = data);
             )*/

   var result= [
        {
            "date" : "01.01.2020",
            "bau_ID" : 20000,
            "bauBz" : "Parkplatz, Dallmann",
            "location" : "Bramsche",
            "lastLocation" : "Hof"
        },
        {
            "date" : "01.02.2020",
            "bau_ID" : 20001,
            "bauBz" : "Lingen, Hochschule Osnabrück",
            "location" : "Lingen",
            "lastLocation" : "Bramsche"
        },
        {
            "date" : "01.03.2020",
            "bau_ID" : 20002,
            "bauBz" : "Musterbaustelle, Münster",
            "location" : "Münster",
            "lastLocation" : "Lingen"
        },
        {
            "date" : "01.04.2020",
            "bau_ID" : 20003,
            "bauBz" : "Schanze, Hamburg",
            "location" : "Hamburg",
            "lastLocation" : "Münster"
        }
    ]



        setTimeout(() => {
            for (let i = 0; i < result.length; i++) {
                datum[i] = result[i].date;
                bauId[i] = result[i].bau_ID;
                bauBZ[i] = result[i].bauBz;
                standort[i] = result[i].location;
                vorStandort[i] = result[i].lastLocation;
            }

            response.status(201).render("historie.ejs",
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
                    geraetenummer: request.body.invNumber,
                    datum: datum,
                    bau_ID: bauId,
                    bauBZ: bauBZ,
                    location: standort,
                    lastLocation: vorStandort,
                });

        }, 1000);


    });

var server = app.listen(3000, () => {
});

module.exports = server;