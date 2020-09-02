/**
 * Import of modules
 * @type {Connection} database connector
 */

const connection = require('../../../src/REST-API/databaseConnection/connection')
const app = require('../../../src/app');

/**
 * route for getting all users out of database
 */

app.get("/api/user/getAllUsers",function (request,response)
{
    sql = "SELECT * FROM WORKER \n" +
        "LEFT JOIN RIGHTS\n" +
        "ON WORKER.role = RIGHTS.role;";

    connection.query(sql,function (err,result)
    {
        if(err){
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
            console.log('Error connecting to Db');
            return;
        }
        console.log('Connection established');
        response.json(result);
    });
});

/**
 * route for getting specific user out of database depending on the worker id
 */

app.get("/api/user/getSpecificUser/:workerId",function (request,response)
{
    sql = "SELECT * FROM WORKER " +
        "LEFT JOIN RIGHTS\n" +
        "ON WORKER.role = RIGHTS.role " +
        "WHERE WORKER.worker_id = " + request.params.workerId +";";

    connection.query(sql,function (err,result)
    {
        if(err){
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
            console.log('Error connecting to Db');
            return;
        }
        console.log('Connection established');
        response.json(result);
    });
});

/**
 * route for creating an new user
 */

app.post("/api/user/createUser",function (request,response)
{
    sql = "INSERT INTO WORKER(password,e_mail,name,surname,role) VALUES " +
        "('"+request.body.password+"','"+request.body.e_mail+"','"+ request.body.name+"','"
        +request.body.surname+"','"+request.body.role+"')";

    connection.query(sql,function (err)
    {
        if(err){
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen."});
            console.log('Error connecting to Db');
            return;
        }
        console.log('Connection established');
        response.json({"Message": "User ist erfolgreich angelegt worden."});
    })

});

/**
 * route for updating an existing user
 */

app.put("/api/user/updateUser/:userId",function (request,response)
{
    update = "UPDATE WORKER SET e_mail ='"+request.body.e_mail +"'," +
        "name ='"+request.body.name+"', surname ='"+ request.body.surname+ "'," +
        "role ='"+request.body.role+ "'" +
        "WHERE worker_id = " + request.params.userId +";";

    connection.query(update,function (err)
    {
        if(err){
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
            console.log('Error connecting to Db');
            return;
        }
        console.log('DeleteDevice.Connection established');
        response.json({"Message": "User mit der ID: "+ request.params.userId +" wurde erfolgreich geupdatet"});
    })
});

/**
 * route for deleting an existing user
 */

app.delete("/api/user/deleteUser/:userId",function (request,response)
{
    sql = "DELETE FROM WORKER" +
        "WHERE WORKER.worker_id = " + request.params.userId +";";

    connection.query(sql,function (err)
    {
        if(err){
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
            console.log('Error connecting to Db');
            return;
        }
        console.log('DeleteDevice.Connection established');
        response.json({"Message": "User mit der ID: "+ request.params.userId +" wurde erfolgreich gelöscht"});
    })
});

/**
 * Port listener
 */

app.listen(3000, () => {
    console.log('Listening on port 3000...');
});