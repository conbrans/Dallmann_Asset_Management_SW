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
        var statement = "SELECT password, worker_id, e_mail, surname," +
            " firstname, WORKER.role, booking_device, booking_request," +
            " edit_device, add_device, view_device, delete_device, add_user, delete_user, edit_user, delete_booking, edit_booking, picking " +
            " FROM WORKER,RIGHTS " +
            "WHERE e_mail ='" +
            req.body.usermail +
            "' and WORKER.role=RIGHTS.role GROUP BY worker_id";


        connection.query(statement, function (err, result) {

            if (result.length !== 0){

                var password = result[0].password;

                var sync = bcrypt.compareSync(password, givenPassword);
                if (sync) {
                    res.json(
                        {
                            "access": true,
                            "worker_id": result[0].worker_id,
                            "e_mail": result[0].e_mail,
                            "firstName": result[0].firstname,
                            "surname": result[0].surname,
                            "role": result[0].role,
                            "rights":
                                {
                                    "booking_device": result[0].booking_device,
                                    "booking_request" : result[0].booking_request,
                                    "edit_device": result[0].edit_device,
                                    "add_device": result[0].add_device,
                                    "view_device": result[0].view_device,
                                    "delete_device": result[0].delete_device,
                                    "add_user": result[0].add_user,
                                    "delete_user": result[0].delete_user,
                                    "edit_user": result[0].edit_user,
                                    "delete_booking": result[0].delete_booking,
                                    "edit_booking": result[0].edit_booking,
                                    "picking": result[0].picking
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