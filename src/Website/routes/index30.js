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