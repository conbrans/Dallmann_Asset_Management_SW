const express = require('express');
const router = express.Router();

let nr = [];
let invNumber = [];
let model = [];
let status = [];
let deviceCategory = [];

var device =[
    {
        "inventoryNumber":"100420",
        "manufacturer":"Makita",
        "model":"Z350",
        "status":"Verfügbar",
        "deviceCategorie":"Winkelschleifer",
        "latitude": 52.52,
        "longtitude": 7.32
    },
    {
        "inventoryNumber":"100698",
        "manufacturer":"DeWalt",
        "model":"RTZ 2080",
        "status":"Ausgeliehen",
        "deviceCategorie":"Akkuflex",
        "latitude": 53.55,
        "longtitude": 9.99
    },
    {
        "inventoryNumber":"100365",
        "manufacturer":"Hilti",
        "model":"Plattmacher",
        "status":"Reperatur",
        "deviceCategorie":"Rüttelplatte",
        "latitude": 52.41,
        "longtitude": 7.97
    },
    {
        "inventoryNumber":"100815",
        "manufacturer":"Stihl",
        "model":"Staubmacher 4000",
        "status":"Geklaut",
        "deviceCategorie":"Kettensäge",
        "latitude": 53.55,
        "longtitude": 9.99
    },
    {
        "inventoryNumber":"100815",
        "manufacturer":"Stihl",
        "model":"Staubmacher 4000",
        "status":"Geklaut",
        "deviceCategorie":"Kettensäge",
        "latitude": 53.55,
        "longtitude": 9.99
    },
    {
        "inventoryNumber":"100815",
        "manufacturer":"Stihl",
        "model":"Staubmacher 4000",
        "status":"Geklaut",
        "deviceCategorie":"Kettensäge",
        "latitude": 53.55,
        "longtitude": 9.99
    },
    {
        "inventoryNumber":"100815",
        "manufacturer":"Stihl",
        "model":"Staubmacher 4000",
        "status":"Geklaut",
        "deviceCategorie":"Kettensäge",
        "latitude": 53.55,
        "longtitude": 9.99
    }
]

for (var i = 0; i < device.length; i++)
{
    nr[i] = i+1;
    invNumber[i] = device[i].inventoryNumber;
    model[i] = device[i].model;
    deviceCategory[i] = device[i].deviceCategorie;
    status[i] =device[i].status;
}


router.post("/home", function (request,result)
{
    result.render('index.ejs',
        {
            benutzername: "Testname",
            nr : nr,
            invNumber : invNumber,
            model : model,
            deviceCategory : deviceCategory,
            status : status
        });
});

router.get("/home", function (request,result)
{
    result.render('index.ejs',
        {
            benutzername: "Testname",
            nr : nr,
            invNumber : invNumber,
            model : model,
            deviceCategory : deviceCategory,
            status : status


        });
});

module.exports = router;

