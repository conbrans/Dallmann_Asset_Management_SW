const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const app = express();
const ONE_YEAR = 1000 * 60 * 60 * 24 * 365;
const connection = require('../../../src/REST-API/databaseConnection/connection');
const router = express.Router();

/*const {
    PORT = 3000,
    SESS_NAME = 'sid',
    SESS_SECRET = 'secret#Session!12',
    SESS_LIFETIME = ONE_YEAR
} = process.env


app.use(session({
        name: SESS_NAME,
        saveUninitialized: false,
        secret: SESS_SECRET,
        resave: false,
        cookie: {
            maxAge: SESS_LIFETIME,
            sameSite: true
        }
    }
))*/

/*TODO
        - Reciving Json from App
   DONE - Reading Json File
   DONE- session
   DONE - Comparing Login Data
   DONE - Sending the Users informations
   DOING - Clear Session
        - test the function
 */

const fs = require('fs');
router.post('/api/login', (req, res) => {


    let givenUserMail = req.body.usermail;
    let givenPassword = req.body.password;


    if (givenUserMail && givenPassword) {

        var statement = "SELECT password, worker_id, e_mail, surname, firstname, WORKER.role, booking_device, edit_device, add_device, view_device, delete_device, add_user, delete_user, edit_user, delete_booking, edit_booking, picking " +
            " FROM WORKER,RIGHTS " +
            "WHERE e_mail ='" +
            req.body.usermail +
            "' GROUP BY worker_id";

        connection.query(statement, function (err, results) {


            var sync = bcrypt.compareSync(results[0].password, givenPassword);
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
                                "delete_device": results[0].delete_user,
                                "add_user": results[0].add_user,
                                "delete_user": results[0].delete_user,
                                "edit_user": results[0].edit_user,
                                "delete_booking": results[0].delete_booking,
                                "edit_booking": results[0].edit_booking,
                                "picking": results[0].picking
                            }
                    }
                )
            } else {
                res.json({"acces": false});
            }
        })
    }
});

/*app.post('/login', function (req, res) {
    //Reading JSON File


    fs.readFile('Login.json', (err, data) => {
        if (err) throw err;
        var jsonData = data;
        var jsonParsed = JSON.parse(jsonData);
    });
    let givenUsername = req.body.username;
    let givenPassword = req.body.password;

    if (givenUsername && givenPassword) {
        connection.query('SELECT password, worker_id, e_mail, surname, firstname, worker.role, booking_device, edit_device, add_device, view_device, delete_device, add_user, delete_user, edit_user, delete_booking, edit_booking FROM worker,rights WHERE e_mail =?', givenUsername, (error, results, fields) => {
            var sync = bcrypt.compareSync(results[0].password, givenPassword);
            if (sync) {
                res.send('Success');
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
                                "delete_device": results[0].delete_user,
                                "add_user": results[0].add_user,
                                "delete_user": results[0].delete_user,
                                "edit_user": results[0].edit_user,
                                "delete_booking": results[0].delete_booking,
                                "edit_booking": results[0].edit_booking,
                                "picking": results[0].picking
                            }
                    }
                )
                req.session.userID = results[0].worker_id;
                req.session.userName = results[0].name + " " + results[0].surname;
                req.session.email = results[0].e_mail;
                req.session.role = results[0].role;
            } else {
                res.json({"acces": false});
            }
        })
        res.send('Enter username and password');
        res.end();
    }
});*/


// TODO Destroy Session
/*req.session.destroy(err => {
    if (err) {}
    res.clearCookie(SESS_NAME)
})
})*/
module.exports = router;