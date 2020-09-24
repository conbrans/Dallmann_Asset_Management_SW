/**
 * Import of modules
 * @type {Connection} database connector
 */

const connection = require('../../../src/REST-API/databaseConnection/connection')
const log = require('../middelwareFunctions/logger');
const { body, validationResult } = require('express-validator');
const constraint = require('../middelwareFunctions/validation');
const express = require('express');
const router = express();


/**
 * route for getting all reservations data
 */

router.get("/api/borrow/getReservations",(request, response) => {

    sql = "SELECT DISTINCT loan_day AS loanDay,loan_end AS loanEnd," +
        " WORKER.firstName, WORKER.surname,\n" +
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

        console.log('GetAllDevices.Connection established');
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

    let sql = "SELECT EXISTS(SELECT * FROM BORROWS WHERE inventory_number = "+request.body.inventoryNumber+"" +
        " AND ((CAST('"+request.body.loanDay+"' AS DATE ) BETWEEN CAST(loan_day AS DATE) AND CAST(loan_end AS DATE))" +
        " OR (CAST('"+request.body.loanEnd+"' AS DATE ) BETWEEN CAST(loan_day AS DATE) AND CAST(loan_end AS DATE))));"

    connection.query(sql,function (err,result) {

        let str = Object.values(result[0])[0];

       /* var string = JSON.stringify(result);
        var str = string.substring(string.length - 3, string.length - 2); */

        if (err) {
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen."});
            console.log('Error connecting to Db');
            return;
        } else if (str == "0") {

           let sql2  = "INSERT INTO BORROWS(loan_day,loan_end,worker_id,inventory_number,project_id) VALUES " +
                "('"+request.body.loanDay+"','"+request.body.loanEnd+"','"+request.body.workerId+"','"
                +request.body.inventoryNumber+"','" +request.body.projectId+"');";
           let sql3 = "UPDATE DEVICE SET device_status = 2 WHERE inventory_number = "+request.body.inventoryNumber+";";

            connection.query(sql2,function (err)
            {
                if(err){
                    response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen."});
                    console.log('Error connecting to Db');
                    return;
                }
                connection.query(sql3,function (err) {
                    if (err) throw err;
                })
                console.log('Connection established');
                response.json({"Message": "Das Gerät mit der ID: "+request.body.inventoryNumber+" ist refolgreich" +
                        " reserviert worden"});
            })

        } else return response.json({"Message": "Im gewählten Zeitraum ist das Gerät bereits reserviert. Bitte einen " +
                "anderen Zeitraum wählen!"})

    })

});

/**
 * route for canceling a reservation
 */

router.delete('/api/borrow/cancelReservation', (request, response) => {

    let sql = "SELECT EXISTS(SELECT * FROM BORROWS WHERE inventory_number = " + request.body.inventoryNumber + ");";

    connection.query(sql, function (err, result) {

        let str = Object.values(result[0])[0];

     /*   var string = JSON.stringify(result);
        var str = string.substring(string.length - 3, string.length - 2); */

        if (err) {
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
            console.log('Error connecting to Db');
            return;
        } else if (str == "1") {

            let sql2 = "DELETE FROM BORROWS WHERE inventory_number = " + request.body.inventoryNumber + "" +
                " AND CAST(loan_day AS DATE) = CAST('" + request.body.loanDay + "' AS DATE) AND CAST(loan_end AS DATE) = CAST('" + request.body.loanEnd + "' AS DATE);";

            let sql3 = "SELECT EXISTS(SELECT * FROM BORROWS WHERE inventory_number = " + request.body.inventoryNumber + "" +
                " AND CURDATE() BETWEEN CAST('" + request.body.loanDay + "' AS DATE )" +
                " AND CAST('" + request.body.loanEnd + "' AS DATE ));"

            let sql4 = "UPDATE DEVICE SET device_status = 1 WHERE inventory_number = " + request.body.inventoryNumber + ";";

            connection.query(sql2, function (err) {
                if (err) {
                    response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                    console.log('Error connecting.sql2 to Db');
                    return;
                }
                console.log('Test')
                connection.query(sql3, function (err, result) {

                    let str = Object.values(result[0])[0];

                  /*  var string = JSON.stringify(result);
                    var str = string.substring(string.length - 3, string.length - 2); */

                    if (err) {
                        response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                        console.log('Error connecting.sql3 to Db');
                        return;
                    } else if (str == "1") {

                        connection.query(sql4, function (err) {
                            if (err) {
                                response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                                console.log('Error connecting.sql4 to Db');
                                return;
                            } else console.log("Test2")
                        })
                        console.log('DeleteDevice.Connection established');
                        response.json({
                            "Message": "Reservierung des Gerätes mit der ID: " + request.params.inventoryNumber + "" +
                                " wurde erfolgreich gelöscht"
                        })
                    } console.log("Test3")

                    response.json({"Message": "Reservierung ist erfolgreich gelöscht worden!"})

                })
            })

        }

        else return response.json({"Message": "Eine Reservation des Gerätes" +
                    " mit der ID: " + request.body.inventoryNumber + " ist nicht vorhanden."})
    })
});

/**
 * Port listener
 */

module.exports = router

