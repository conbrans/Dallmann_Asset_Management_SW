const express = require('express');
const router = express.Router();
const app = require('../../app');
const redirect = require('../routes/redirect');
const mysql = require('mysql');
const fetch = require('node-fetch');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "asssetmanagement"
});


router.post("/addUser", redirect.redirectLogin, redirect.redirectHomeAdmin, function (request,response)
{
   /* fetch('http://localhost:3032/user', {
        method : 'POST',
        headers: { "Content-Type": "application/json" },
        mode: 'cors',
        body: JSON.stringify({
            body : request.body,
        })
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch((error) => {
            console.error('Error:', error);
        });*/


    sql = "INSERT INTO worker(password,e_mail,user_identification,name,surname,role) VALUES " +
        "('"+request.body.password+"','"+request.body.email+"','"+request.body.email+"','"
        + request.body.firstName+"','"+request.body.lastName+"',"+request.body.role+")";
    con.query(sql,function (err)
    {
        if (err) throw err;
    })
    response.redirect("/userManagement");

});

module.exports = router;