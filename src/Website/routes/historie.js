const express = require('express');
const router = express.Router();
const redirect = require('../routes/redirect');

let datum = [];
let bauId = [];
let bauBZ = [];
let standort = [];
let vorStandort = [];


var test = [
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


for (var i=0;i<test.length;i++)
{
    datum[i] = test[i].date;
    bauId[i] = test[i].bau_ID;
    bauBZ[i] = test[i].bauBz;
    standort[i] = test[i].location;
    vorStandort[i] = test[i].lastLocation;
}



router.get("/historie",redirect.redirectLogin, function (request,result)
{
    result.render("historie.ejs",
        {
            benutzername: request.session.userName,
            role : request.session.role,
            geratenummer : "320-400-673",
            datum : datum,
            bau_ID :bauId,
            bauBZ : bauBZ,
            location : standort,
            lastLocation : vorStandort,
        });
});


module.exports = router;