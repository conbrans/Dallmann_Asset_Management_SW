/**
 * Version 1.0
 * 06.10.2020
 *
 * @module /worker
 */


/**
 * Import of modules
 *
 * @type {Connection} database connector
 */

const connection = require('../../../src/REST-API/databaseConnection/connection');
const {body, validationResult} = require('express-validator');
const constraint = require('../middelwareFunctions/validation');
const express = require('express');
const crypto = require('../../Website/routes/helproutes/crypto.js');
const bcrypt = require('bcrypt');
const router = express();
const hashing = require('../login/passwordHashingBcrypt');

/**
 * route for getting all users out of database
 *
 * GET
 *
 * @param request - send information from client within a JSON file
 * @param response - sending the result within a JSON file to client
 */

router.get("/api/user/getAllUsers", (request, response) => {

    sql = "SELECT DISTINCT WORKER.worker_id AS workerId,password,e_mail AS eMail,surname,firstname,\n" +
        "RIGHTS.role,booking_device AS bookingDevice,edit_device AS editDevice,add_device AS addDevice,\n" +
        "view_device AS viewDevice,delete_device AS deleteDevice,add_user AS addUser,delete_user AS deleteUser,\n" +
        "edit_user AS editUser,delete_booking AS deleteBooking,edit_booking AS editBooking\n" +
        "FROM WORKER \n" +
        "LEFT JOIN RIGHTS\n" +
        "ON WORKER.role = RIGHTS.role;";

    connection.query(sql, (err, result) => {
        if (err) {
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
            console.log('Error connecting to Db');
            return;
        }

        response.json(result);
    });
});

/**
 * route for getting specific user out of database depending on the worker id
 *
 * GET
 *
 * @param request - send information from client within a JSON file
 * @param response - sending the result within a JSON file to client
 */

router.get("/api/user/getSpecificUser/:workerId", (request, response) => {

    sql = "SELECT DISTINCT WORKER.worker_id AS workerId,password,e_mail AS eMail,surname,firstname,\n" +
        "RIGHTS.role,booking_device AS bookingDevice,edit_device AS editDevice,add_device AS addDevice,\n" +
        "view_device AS viewDevice,delete_device AS deleteDevice,add_user AS addUser,delete_user AS deleteUser,\n" +
        "edit_user AS editUser,delete_booking AS deleteBooking,edit_booking AS editBooking\n" +
        "FROM WORKER \n" +
        "LEFT JOIN RIGHTS\n" +
        "ON WORKER.role = RIGHTS.role\n" +
        "WHERE WORKER.worker_id = " + request.params.workerId + ";";

    connection.query(sql, (err, result) => {
        if (err) {
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
            console.log('Error connecting to Db');
            return;
        }

        response.json(result);
    });
});

/**
 * route for creating an new user
 *
 * @param request - send information from client within a JSON file
 * @param response - sending the result within a JSON file to client
 */

router.post("/api/user/createUser", constraint.workerConstraints, (request, response) => {

    // Validating the sent data
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.json(errors.array());
    }
    //Inserting a new user in table WORKER
    sql = "INSERT INTO WORKER(password,e_mail,surname,firstname,role) VALUES " +
        "('" + hashing.secondHashe(request.body.password) + "','" + request.body.eMail + "','" + request.body.surname + "','"
        + request.body.firstname + "','" + request.body.role + "')";

    connection.query(sql, (err) => {
        if (err) {
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen."});
            console.log('Error connecting to Db');
            return;
        }
        //If creating user is successful this message will be sent to client
        response.json({"Message": "User ist erfolgreich angelegt worden."});
    })
});

/**
 * route for updating an existing user
 *
 * PUT {eMail, surname, firstname, role, userId}
 *
 * @param request - send information from client within a JSON file
 * @param response - sending the result within a JSON file to client
 */

router.put("/api/user/updateUser/:userId", constraint.workerUpdateConstraints, (request, response) => {

    //Validating the sent data
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.json(errors.array());
    }

    sql = "SELECT EXISTS(SELECT * FROM WORKER WHERE worker_id = " + request.params.userId + ");";

    connection.query(sql, (err, result) => {
        // str = 0 (there is no user) or 1 (there is a user)
        let str = Object.values(result[0])[0];

        if (err) {
            response.json({"Message": "Test"});
            console.log('Error connecting to Db');
            return;
            //Check if the result is equals 1 (there is a user)
        } else if (str == "1") {

            //updating the specific and existing user
            update = "UPDATE WORKER SET e_mail ='" + request.body.eMail + "'," +
                "surname ='" + request.body.surname + "', firstname ='" + request.body.firstname + "'," +
                "role ='" + request.body.role + "'" +
                "WHERE worker_id = " + request.params.userId + ";";

            connection.query(update, (err) => {

                if (err) {
                    response.json({
                        "Message": "Verbindung" +
                            " zur Datenbank fehlgeschlagen"
                    });
                    console.log('Error connecting to Db');
                    return;
                }
                //If update is successful this message will be sent to client
                return response.json({
                    "Message": "User mit der ID:" +
                        " " + request.params.userId + " wurde" +
                        " erfolgreich geupdatet"
                });
            })
        }
        //If update is unsuccessful this message will be sent to client
        else return response.json({
                "Message": "Ein User mit der ID:" +
                    " " + request.params.userId + " ist nicht vorhanden."
            })
    })
});


/**
 * route for deleting an existing user depending on the userID
 *
 * DELETE {userId}
 *
 * @param request - send information from client within a JSON file
 * @param response - sending the result within a JSON file to client
 */

router.delete("/api/user/deleteUser/:userId", (request, response) => {
    //check if there is user with given ID
    let sql = "SELECT EXISTS(SELECT * FROM WORKER WHERE worker_id = " + request.params.userId + ");";

    connection.query(sql, (err, result) => {
        //str = 0 (there is not) or 1 (there is)
        let str = Object.values(result[0])[0];

        if (err) {
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen sql"});
            console.log('Error connecting to Db');
            return;
            //Check if result is equals 1 (there is)
        } else if (str == "1") {

            let sql2 = "DELETE FROM WORKER WHERE WORKER.worker_id = " + request.params.userId + ";";
            //deleting the specific user depending on userId
            connection.query(sql2, (err) => {
                if (err) {
                    response.json({
                        "Message": "Verbindung zur Datenbank" +
                            " fehlgeschlagen sql2"
                    });
                    console.log('Error connecting to Db');
                    return;
                }
                //If delete is successful this message will be sent to client
                response.json({
                    "Message": "User mit der ID:" +
                        " " + request.params.userId + " wurde" +
                        " erfolgreich gelöscht"
                });
            })
        }
        //If there is no user with the given userId this message will be sent to client
        else return response.json({
                "Message": "Ein Gerät mit der ID:" +
                    " " + request.params.userId + " ist" +
                    " nicht vorhanden."
            })
    })
});

/**
 * route for updating the password of user
 *
 * PUT {password}
 *
 * @param request - send information from client within a JSON file
 * @param response - sending the result within a JSON file to client
 */

router.put("/api/user/updatePassword", (request, response) => {
    //updating the oass word for the user with the given eMail
    sql = "UPDATE WORKER SET password='" + hashing.secondHashe(request.body.password) + "' WHERE e_mail ='" + request.body.eMail + "';";

    connection.query(sql, (err) => {
        if (err) {
            response.json({
                "Message": "Verbindung zur Datenbank" +
                    " fehlgeschlagen sql2"
            });
            console.log('Error connecting to Db');
            return;
        }
        //If change of password is successful this message will be sent to client
        response.json({"Message": "Passwort wurde erfolgreich bearbeitet"});
    })

});

/**
 * route for editing user profile
 *
 * POST {eMail, firstname, surname, password, userId}
 *
 * @param request - send information from client within a JSON file
 * @param response - sending the result within a JSON file to client
 */

router.post("/api/user/editProfile/:userId", (request, response) => {

    let password = crypto.decrypt(request.body.password);
    //update the profile with given information
    update = "UPDATE WORKER SET e_mail ='" + request.body.eMail + "'," +
        "surname ='" + request.body.surname + "', firstname ='" + request.body.firstname + "', password ='" + password + "'" +
        "WHERE worker_id = " + request.params.userId + ";";


    connection.query(update, (err) => {
        if (err) {
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen sql2"});
            console.log('Error connecting to Db');
            return;
        }
        //If edit profile is successful this message will be sent to client
        response.json({"Message": "Profil wurde erfolgreich bearbeitet."});
    })
});

router.put("/api/user/comparePassword", (request, response) => {

    sql = "SELECT WORKER.password FROM WORKER WHERE e_mail ='" + request.body.eMail + "';";

    connection.query(sql, (err, result) => {
        if (err) {
            response.json({
                "Message": "Verbindung zur Datenbank" +
                    " fehlgeschlagen sql2"
            });
            console.log('Error connecting to Db');
            return;
        }

        if (!hashing.compare(request.body.password, result[0].password)) {
            return response.json({
                "Message": "Kombination aus Passwort und" +
                    " EMail stimmt nicht."
            })

        } else return response.json({"Message": "Kombination ist korrekt."});

    })
});

//export of this module
module.exports = router;


