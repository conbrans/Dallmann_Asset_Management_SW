/**
 * Import of modules
 * @type {Connection} database connector
 */

const connection = require('../../../src/REST-API/databaseConnection/connection')
const app = require('../../../src/app');
const { body, validationResult } = require('express-validator');
const constraint = require('../middelwareFunctions/validation');
const express = require('express');
const router = express.Router();

/**
 * route for getting all reservations data
 */

router.get("/api/borrow/getReservations",(request, response) => {

    sql = "SELECT DISTINCT loan_day AS loanDay,loan_end AS loanEnd, WORKER.name, WORKER.surname,\n" +
        "PROJECT.project_id AS projectId, PROJECT.name AS buildingSite, inventory_number AS inventoryNumber\n" +
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

router.post("/api/borrow/createReservation", constraint.reservationConstraints, (request, response) => {

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.json(errors.array());
    }

    sql  = "INSERT INTO BORROWS(loan_day,loan_end,worker_id,inventory_number,project_id) VALUES " +
         "('"+request.body.loanDay+"','"+request.body.loanEnd+"','"+request.body.workerId+"','"
             +request.body.inventoryNumber+"','" +request.body.projectId+"');";
    sql2 = "UPDATE DEVICE SET device_status = 2 WHERE inventory_number = "+request.body.inventoryNumber+";";

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
        response.json({"Message": "Das Gerät mit der ID: "+request.body.inventoryNumber+" ist refolgreich" +
                " reserviert worden"});
    })

});

/**
 * route for canceling a reservation
 */

router.delete('/api/borrow/cancelReservation/:inventoryNumber', (request, response) => {

    let sql1 = "SELECT EXISTS(SELECT * FROM WORKER WHERE worker_id = " + request.params.inventoryNumber + ");";

    connection.query(sql1, function (err, result) {

        var string = JSON.stringify(result);
        var str = string.substring(string.length - 3, string.length - 2);

        if (err) {
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
            console.log('Error connecting to Db');
            return;
        } else if (str === "1") {

            sql = "DELETE FROM BORROWS WHERE inventory_number = " + request.params.inventoryNumber + ";";
            sql2 = "UPDATE DEVICE SET device_status = 1 WHERE inventory_number = " + request.params.inventoryNumber + ";";

            connection.query(sql, function (err) {
                if (err) {
                    response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                    console.log('Error connecting to Db');
                    return;
                }
                connection.query(sql2, function (err) {
                    if (err) throw err;
                })
                console.log('DeleteDevice.Connection established');
                response.json({"Message": "Reservierung des Gerätes mit der ID: " + request.params.inventoryNumber + "" +
                        " wurde erfolgreich gelöscht"})
            })
        }
        else return response.json({"Message": "Eine Reservation des Gerätes" +
                    " mit der ID: " + request.params.inventoryNumber + " ist nicht vorhanden."})
    })
});

/**
 * Port listener
 */

module.exports = router

