/**
 * ZUM TESTEN VON fetch für Kevin
 * request body enthält die werte usermail und password( noch im klartext)
 * @type {Express}
 */

const app = require('../../app');
const mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "asssetmanagement"
});



var {
    PORT = 3032,
} = process.env;

app.post("/json", function (request,response)
{

   response.json({
       "access" : true,
       "worker_id" : 1,
       "password" : "test",
       "e_mail" : "c.brans@dallmann-bau.de",
       "user_identification" : "Kouis",
       "name" : "Kouis",
       "surname" : "Lottmann",
       "role" : 1,
       "rights" : [1,1,1,1,1,1,1,1,1,1]
   });
})

app.post("/user",function (request,reponse)
{
    console.log(request.body);

});

app.get("/devices", function (request,response)
{
    response.json(
        [
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
            }
        ]);

});



app.get("/users",function (request,response)
{
    sql = "SELECT * FROM worker;";
    con.query(sql,function (err,result)
    {
        if (err) throw err;
        response.json(result);
    })


});

app.listen(PORT, () => console.log(
    "listening on: " +
    `http://localhost:${PORT}`
));