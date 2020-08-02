const express = require('express');
const router = express.Router();

let datum = [];
let bauId = [];
let bauBZ = [];
let standort = [];
let vorStandort = [];

datum[0] = "01.01.2020";
datum[1] = "01.02.2020";
datum[2] = "01.03.2020";
datum[3] = "01.04.2020";

bauId[0] = 20000;
bauId[1] = 20001;
bauId[2] = 20002;
bauId[3] = 20003;

bauBZ[0] = "Parkplatz, Dallmann";
bauBZ[1] = "Lingen, Hochschule Osnabrück";
bauBZ[2] = "Musterbaustelle, Münster";
bauBZ[3] = "Schanze, Hamburg";

standort[0] = "Bramsche";
standort[1] = "Lingen";
standort[2] = "Münster";
standort[3] = "Hamburg";

vorStandort[0] = "Hof";
vorStandort[1] = "Bramsche";
vorStandort[2] = "Lingen";
vorStandort[3] = "Münster";

router.get("/historie", function (request,result)
{
    result.render("historie.ejs",
        {
            benutzername : "Testname",
            geratenummer : "320-400-673",
            datum : datum,
            bauId :bauId,
            bauBZ : bauBZ,
            standort : standort,
            vorStandort : vorStandort,
        });
});


module.exports = router;