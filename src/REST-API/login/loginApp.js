/**
 * Version 1.0
 * 02.10.2020
 *
 * @module /loginApp
 */

/**
 * Import of modules
 *
 * @type {Connection} database connector
 */

const mysql = require('mysql');
const express = require('express');
const bcrypt = require('bcrypt');
const connection = require('../../../src/REST-API/databaseConnection/connection');
const router = express.Router();


/**
 * route for login
 *
 *
 * @param request - send login information from client within a JSON file
 * @param response - sending the necessary Data within a JSON file to client
 */
router.post('/api/login', (req, res) => {
    
    var givenUserMail = req.body.usermail;
    var givenPassword = req.body.password;

    console.log(givenUserMail,givenPassword);

    if (givenUserMail && givenPassword) {

        /**
         * sql statement for user information in database
         * @type {string}
         */
        var statement = "SELECT password, worker_id, e_mail, surname, firstname, WORKER.role, booking_device, edit_device, add_device, view_device, delete_device, add_user, delete_user, edit_user, delete_booking, edit_booking, picking " +
            " FROM WORKER,RIGHTS " +
            "WHERE e_mail ='" +
            req.body.usermail +
            "' and WORKER.role=RIGHTS.role GROUP BY worker_id";

        connection.query(statement, function (err, results) {

            if (results.length !== 0){

                var password = results[0].password;

                var sync = bcrypt.compareSync(password, givenPassword);
                if (sync) {
                    res.json(
                        {
                            "access": true,
                            "worker_id": results[0].worker_id,
                            "e_mail": results[0].e_mail,
                            "firstName": results[0].firstname,
                            "surname": results[0].surname,
                            "role": results[0].role,
                            "rights":
                                {
                                    "booking_device": results[0].booking_device,
                                    "edit_device": results[0].edit_device,
                                    "add_device": results[0].add_device,
                                    "view_device": results[0].view_device,
                                    "delete_device": results[0].delete_device,
                                    "add_user": results[0].add_user,
                                    "delete_user": results[0].delete_user,
                                    "edit_user": results[0].edit_user,
                                    "delete_booking": results[0].delete_booking,
                                    "edit_booking": results[0].edit_booking,
                                    "picking": results[0].picking
                                }
                        })
                } else {
                    res.json({"access": false});
                }
            }
            else{
                res.json({"access": false});
            }
        })
    }
});

module.exports = router;