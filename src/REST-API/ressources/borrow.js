/**
 * Import of modules
 * @type {Connection} database connector
 */

const connection = require('../../../src/REST-API/databaseConnection/connection')
const app = require('../../../src/app');

/**
 * route for getting all reservations data
 */

app.get("/api/borrow/getReservations",function (request,response)
{
    sql = "SELECT DISTINCT loan_day,loan_end, WORKER.name, WORKER.surname, PROJECT.name AS Baustelle, inventory_number\n" +
        "FROM BORROWS\n" +
        "INNER JOIN PROJECT\n" +
        "ON BORROWS.project_id = BORROWS.project_id\n" +
        "LEFT JOIN WORKER\n" +
        "ON BORROWS.worker_id = WORKER.worker_id\n" +
        "WHERE PROJECT.project_id = BORROWS.project_id;\n";

    connection.query(sql,function (err,result)
    {
        if(err){
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
            console.log('Error connecting to Db');
            return;
        }
        var json = JSON.stringify(result)
        console.log('GetAllDevices.Connection established');
        console.log(result)
        response.json(result);
    });

});

/**
 * route for creating a reservation
 */

app.post("/api/borrow/createReservation",function (request,response)
{
    sql  = "INSERT INTO BORROWS(loan_day,loan_end,worker_id,inventory_number,project_id) VALUES " +
         "('"+request.body.loan_day+"','"+request.body.loan_end+"','"+request.body.worker_id+"','"
             +request.body.inventory_number+"','" +request.body.project_id+"');";
    sql2 = "UPDATE DEVICE SET device_status = 2 WHERE inventory_number = "+request.body.inventory_number+";";

    connection.query(sql,function (err)
    {
        if(err){
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen."});
            console.log('Error connecting to Db');
            return;
        }
        connection.query(sql2,function (err) {
        if (err) throw err;
        })
        console.log('Connection established');
        response.json({"Message": "Das Gerät mit der ID: "+request.body.inventory_number+" ist refolgreich" +
                " reserviert worden"});
    })

});

/**
 * route for canceling a reservation
 */

app.delete('/api/borrow/cancelReservation/:inventoryNumber',function (request,response)
{
    sql = "DELETE FROM BORROWS WHERE inventory_number = " + request.params.inventoryNumber +";";
    sql2= "UPDATE DEVICE SET device_status = 1 WHERE inventory_number = "+request.params.inventoryNumber+";";

    connection.query(sql,function (err)
    {
        if(err){
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
            console.log('Error connecting to Db');
            return;
        }
        connection.query(sql2,function (err) {
            if (err) throw err;
        })
        console.log('DeleteDevice.Connection established');
        response.json({"Message": "Reservierung des Gerätes mit der ID: "+ request.params.inventoryNumber +" wurde erfolgreich gelöscht"});
    })
});

/**
 * Port listener
 */

app.listen(3003, () => {
    console.log('Listening on port 3003...');
});
