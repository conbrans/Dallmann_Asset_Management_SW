/**
 * Import of modules
 * @type {Connection} database connector
 */

const connection = require('../../../src/REST-API/databaseConnection/connection');
const { body, validationResult } = require('express-validator');
const constraint = require('../middelwareFunctions/validation');
const express = require('express');
const router = express.Router();

/**
 * route for getting all users out of database
 */

router.get("/api/user/getAllUsers",(request, response) => {

    sql = "SELECT DISTINCT WORKER.worker_id AS workerId,password,e_mail AS eMail,surname,firstname,\n" +
        "RIGHTS.role,booking_device AS bookingDevice,edit_device AS editDevice,add_device AS addDevice,\n" +
        "view_device AS viewDevice,delete_device AS deleteDevice,add_user AS addUser,delete_user AS deleteUser,\n" +
        "edit_user AS editUser,delete_booking AS deleteBooking,edit_booking AS editBooking\n" +
        "FROM WORKER \n" +
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

router.get("/api/user/getSpecificUser/:workerId",(request, response) => {

    sql = "SELECT DISTINCT WORKER.worker_id AS workerId,password,e_mail AS eMail,surname,firstname,\n" +
        "RIGHTS.role,booking_device AS bookingDevice,edit_device AS editDevice,add_device AS addDevice,\n" +
        "view_device AS viewDevice,delete_device AS deleteDevice,add_user AS addUser,delete_user AS deleteUser,\n" +
        "edit_user AS editUser,delete_booking AS deleteBooking,edit_booking AS editBooking\n" +
        "FROM WORKER \n" +
        "LEFT JOIN RIGHTS\n" +
        "ON WORKER.role = RIGHTS.role\n" +
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

router.post("/api/user/createUser", constraint.workerConstraints, (request, response) =>
{
   console.log(request.body);
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.json(errors.array());
    }

    sql = "INSERT INTO WORKER(password,e_mail,surname,firstname,role) VALUES " +
        "('"+request.body.password+"','"+request.body.eMail+"','"+ request.body.surname+"','"
        +request.body.firstName+"','"+request.body.role+"')";


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

router.put("/api/user/updateUser/:userId", constraint.workerUpdateConstraints, (request, response) => {
    sql = "SELECT EXISTS(SELECT * FROM WORKER WHERE worker_id = " + request.params.userId + ");";


    connection.query(sql, function (err, result) {

        var string = JSON.stringify(result);
        var str = string.substring(string.length - 3, string.length - 2);




        if (err) {
            response.json({"Message": "Test"});
            console.log('Error connecting to Db');
            return;
        } else if (str === "1") {

            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                return response.json(errors.array());
            }


            update = "UPDATE WORKER SET e_mail ='" + request.body.eMail + "'," +
                "surname ='" + request.body.firstName + "', firstname ='" + request.body.surname + "'," +
                "role ='" + request.body.role + "'" +
                "WHERE worker_id = " + request.params.userId + ";";
            connection.query(update, function (err) {
                if (err) {
                    response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                    console.log('Error connecting to Db');
                    return;
                }
                console.log('updateUser.Connection established');
                response.json({"Message": "User mit der ID: " + request.params.userId + " wurde erfolgreich geupdatet"});
            })
        }

        else return response.json({"Message": "Ein User mit der ID: " + request.params.userId + " ist nicht vorhanden."})

    })
});


/**
 * route for deleting an existing user
 */

router.delete("/api/user/deleteUser/:userId",(request, response) => {
    console.log("Delete User mit der ID:"+request.params.userId);

    let sql = "SELECT EXISTS(SELECT * FROM WORKER WHERE worker_id = " + request.params.userId + ");";

    connection.query(sql, function (err, result) {

        var string = JSON.stringify(result);
        var str = string.substring(string.length - 3, string.length - 2);

        if (err) {
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen sql"});
            console.log('Error connecting to Db');
            return;
        } else if (str === "1") {

            let sql2 = "DELETE FROM WORKER WHERE WORKER.worker_id = " + request.params.userId + ";";

            connection.query(sql2, function (err) {
                if (err) {
                    response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen sql2"});
                    console.log('Error connecting to Db');
                    return;
                }
                console.log('updateUser.Connection established');
                response.json({"Message": "User mit der ID: " + request.params.userId + " wurde erfolgreich gelöscht"});
            })

        }
        else return response.json({"Message": "Ein Gerät mit der ID: " + request.params.userId + " ist nicht vorhanden."})
    })

});

module.exports = router;
/**
 * Port listener
 */

/*app.listen(3000, () => {
    console.log('Listening on port 3000...');
}); */