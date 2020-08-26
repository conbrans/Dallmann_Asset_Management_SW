/**
 * ZUM TESTEN VON fetch für Kevin
 * request body enthält die werte usermail und password( noch im klartext)
 * @type {Express}
 */

const app = require('../../../app');
const mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "assetmanagement"
});



var {
    PORT = 3032,
} = process.env;

/**
 *  zum einloggen von Nutzern
 */
app.post("/json", function (request,response)
{

    var firstsql = "SELECT worker_id, e_mail, name, surname, worker.role, booking_device, edit_device, add_device, view_device, delete_device, add_user, delete_user, edit_user, delete_booking, edit_booking FROM worker,rights WHERE e_mail = '" + request.body.usermail+ "' and password='"+ request.body.password +"' and worker.role = rights.role\n" +
        "GROUP BY worker.role; ";

    con.query(firstsql, function (err,res)
    {
        if (err) throw err;
        if (res.length===0)
        {
        response.json({ "acces" : false});
        }else
            {
                response.json(
                    {
                        "access" : true,
                        "worker_id" : res[0].worker_id,
                        "e_mail" : res[0].e_mail,
                        "name" : res[0].name,
                        "surname" : res[0].surname,
                        "role" : res[0].role,
                        "rights" :
                            {
                                "booking_device": res[0].booking_device,
                                "edit_device": res[0].edit_device,
                                "add_device": res[0].add_device,
                                "view_device": res[0].view_device,
                                "delete_device": res[0].delete_user,
                                "add_user": res[0].add_user,
                                "delete_user": res[0].delete_user,
                                "edit_user": res[0].edit_user,
                                "delete_booking": res[0].delete_booking,
                                "edit_booking": res[0].edit_booking
                            }
                    });
            }
    })
})
/**
 * Hinzufügen von Nutzern
 */
app.post("/user",function (request,response)
{
    sql = "INSERT INTO worker(password,e_mail,user_identification,name,surname,role) VALUES " +
        "('"+request.body.password+"','"+request.body.email+"','"+request.body.email+"','"
        + request.body.firstName+"','"+request.body.lastName+"','"+request.body.role+"')";
    con.query(sql,function (err)
    {
        if (err) throw err;
        response.json({"Messagge": "Nutzer wurde hinzugefügt"});
    })


});
/**
 * Geräteliste
 */
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

/**
 * Abfrage aller Nutzer
 */
app.get("/users",function (request,response)
{
    sql = "SELECT * FROM worker;";
    con.query(sql,function (err,result)
    {
        if (err) throw err;
        response.json(result);
    })
});
/**
 * Löschen eines Nutzers anhand der Mail-Adresse
 */
app.post("/deleteUser",function (request,response)
{
    sql = "DELETE FROM worker WHERE e_mail ='"+request.body.e_Mail+"';";
    con.query(sql,function (err)
    {
        if (err) throw err;
    })
});
/**
 * Zurücksetzen des Passwortes auf "Werkseinstellungen" in dem Fall 123456
 */
app.post("/resetPassword",function (request,response)
{
    sql = "UPDATE worker SET password='123456' WHERE e_mail ='"+request.body.e_Mail+"';";
    con.query(sql,function (err)
    {
        if (err) throw err;
    })
});


app.post("/updateUser",function (request,response)
{
    update = "UPDATE worker SET name ='"+request.body.firstName +"', surname ='"+ request.body.surname+"', e_mail = '"+request.body.mail+"' WHERE e_mail = '"+ request.body.firstmail+ "'";
    con.query(update,function (err)
    {
        if (err) throw err;
    })
});

app.listen(PORT, () => console.log(
    "listening on: " +
    `http://localhost:${PORT}`
));
