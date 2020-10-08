/**
 * Version 1.0
 * 06.10.2020
 *
 * @module /borrow
 */


/**
 * Import of modules
 *
 * @type {Connection} database connector
 */

const connection = require('../../../src/REST-API/databaseConnection/connection');
const log = require('../middelwareFunctions/logger');
const { body, validationResult } = require('express-validator');
const constraint = require('../middelwareFunctions/validation');
const express = require('express');
const router = express();

/**
 * route for getting all borrows out of database
 *
 * GET
 *
 * @param request - send information from client within a JSON file
 * @param response - sending the result within a JSON file to client
 */
router.get("/api/borrow/getReservations",(request, response) => {

    sql = "SELECT DISTINCT loan_day AS loanDay,loan_end AS loanEnd," +
        " WORKER.firstname, WORKER.surname,\n" +
        "PROJECT.project_id AS projectId, PROJECT.name AS buildingSite, inventory_number AS inventoryNumber\n" +
        "FROM BORROWS\n" +
        "INNER JOIN PROJECT\n" +
        "ON BORROWS.project_id = BORROWS.project_id\n" +
        "LEFT JOIN WORKER\n" +
        "ON BORROWS.worker_id = WORKER.worker_id\n" +
        "WHERE PROJECT.project_id = BORROWS.project_id;\n";

    connection.query(sql,function (err,result) {

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
 * route for getting specific borrow depending
 * on the given integer inventoryNumber
 *
 * GET
 *
 * @param request - send information from client within a JSON file
 * @param response - sending the result within a JSON file to client
 * @param inventoryNumber - given inventoryNumber from a specific device
 */


router.get("/api/borrow/getReservation/:inventoryNumber",(req, res) => {

    sql = "SELECT DISTINCT loan_day  AS loanDay ,loan_end  AS loanEnd FROM" +
        " BORROWS WHERE inventory_number =" + req.params.inventoryNumber +";";

    connection.query(sql,(err,result)=>{
        if (err){
            res.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
            console.log('Error connecting to Db');
            return;
        }
        res.json(result);

    });
})

/**
 * route for creating a reservation
 */

router.post("/api/borrow/createReservation",
    constraint.createReservationConstraints, (request, response) => {

        //check if the given information are valid
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.json(errors.array());
        }

        //converting given dates into needed form
        let sentLoanDay = new Date(new Date(request.body.loanDay).setHours(+2));
        let newLoanDay = sentLoanDay.toISOString();

        let sentLoanEnd = new Date(new Date(request.body.loanEnd).setHours(+2));
        let newLoanEnd = sentLoanEnd.toISOString();

        let today = new Date();
        let newDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

        let loanDate = new Date(request.body.loanDay);
        let newLoanDate = loanDate.getFullYear()+'-'+(loanDate.getMonth()+1)+'-'+loanDate.getDate();


        //boolean check if there is already a reservation which matches the given dates
        let selectExist = "SELECT EXISTS(SELECT * FROM BORROWS WHERE inventory_number = "+request.body.inventoryNumber+"" +
            " AND ((CAST('"+newLoanDay+"' AS DATE ) BETWEEN CAST(loan_day AS DATE) AND CAST(loan_end AS DATE))" +
            " OR (CAST('"+newLoanEnd+"' AS DATE ) BETWEEN CAST(loan_day AS DATE) AND CAST(loan_end AS DATE))));"

        connection.query(selectExist,function (err,result) {
            //str = 0(there is not) or 1(there is)
            let str = Object.values(result[0])[0];

            if (err) {
                response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen."});
                console.log('Error connecting to Db');
                return;

            } else if (str == "0") {

                let insertBorrows  = "INSERT INTO BORROWS(loan_day,loan_end,worker_id,inventory_number,project_id) VALUES " +
                    "('"+newLoanDay+"','"+newLoanEnd+"','"+request.body.workerId+"','"
                    +request.body.inventoryNumber+"','" +request.body.projectId+"');";

                connection.query(insertBorrows,function (err) {
                    if (err) {
                        response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen."});
                        console.log('Error connecting to Db');
                        return;
                    //check if the loan start is at current day
                    } else if (newDate === newLoanDate) {

                        let updateDevice = "UPDATE DEVICE SET device_status = 2 WHERE inventory_number = " + request.body.inventoryNumber + ";";

                        connection.query(updateDevice, function (err) {
                            if (err) {
                                response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen."});
                                console.log('Error connecting to Db');
                                return;
                            }
                        })
                    }
                    //if the reservation was successful a specified message will be sent to client
                    response.json({"Message": "Das Gerät mit der ID: "+request.body.inventoryNumber+" ist refolgreich" +
                            " reserviert worden"});
                })
              //if reservation was unsuccessful a specified message will be send to client
            } else return response.json({"Message": "Im gewählten Zeitraum ist das Gerät bereits reserviert. Bitte einen " +
                    "anderen Zeitraum wählen!"})

        })

    });

/**
 * route for canceling a reservation
 */
router.delete('/api/borrow/cancelReservation',
    constraint.deleteReservationConstraints, (request, response) => {

        let sentLoanDay = new Date(new Date(request.body.loanDay).setHours(+2));
        let newLoanDay = sentLoanDay.toISOString();

        let sentLoanEnd = new Date(new Date(request.body.loanEnd).setHours(+2));
        let newLoanEnd = sentLoanEnd.toISOString();

        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.json(errors.array());
        }

        let sql = "SELECT EXISTS(SELECT * FROM BORROWS WHERE inventory_number = " + request.body.inventoryNumber + ");";

        connection.query(sql, function (err, result) {

            let str = Object.values(result[0])[0];

            if (err) {
                response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                console.log('Error connecting to Db');
                return;
            } else if (str == "1") {

                let sql2 = "DELETE FROM BORROWS WHERE inventory_number = " + request.body.inventoryNumber + "" +
                    " AND CAST(loan_day AS DATE) = CAST('" + newLoanDay + "' AS DATE) AND CAST(loan_end AS DATE) = CAST('" + newLoanEnd + "' AS DATE);";

                let sql3 = "SELECT EXISTS(SELECT * FROM BORROWS WHERE inventory_number = " + request.body.inventoryNumber + "" +
                    " AND CURDATE() BETWEEN CAST('" + newLoanDay + "' AS DATE )" +
                    " AND CAST('" + newLoanEnd + "' AS DATE ));"

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


//export of this module
module.exports = router