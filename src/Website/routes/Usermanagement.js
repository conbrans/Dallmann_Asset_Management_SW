const express = require('express');
const router = express.Router();
const app = require('../../app');
const redirect = require('../routes/redirect');
const fetch = require('node-fetch');


router.post("/addUser", redirect.redirectLogin, redirect.authRight("add_user"), function (request,response)
{
     fetch('http://localhost:3032/user', {
         method : 'POST',
         headers: { "Content-Type": "application/json" },
         mode: 'cors',
         body: JSON.stringify(request.body)
     })
         .then(response => response.json())
         .then(data => console.log(data))
         .catch((error) => {
             console.error('Error:', error);
         });
    response.redirect("/userManagement");

});

router.post("/updateUser", redirect.authRight("edit_user"), function (request,response)
{
    fetch('http://localhost:3032/updateUser', {
        method : 'POST',
        headers: { "Content-Type": "application/json" },
        mode: 'cors',
        body: JSON.stringify(request.body)
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch((error) => {
            console.error('Error:', error);
        });
    response.redirect("/userManagement");

});



router.post("/deleteU", redirect.authRight("delete_user"),function (request,response)
{
    fetch('http://localhost:3032/deleteUser', {
        method : 'POST',
        headers: { "Content-Type": "application/json" },
        mode: 'cors',
        body: JSON.stringify(request.body)
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch((error) => {
            console.error('Error:', error);
        });
    response.redirect("/userManagement");
});

router.post("/resetPW",redirect.authRight("delete_user"),function (request,response)
{
    fetch('http://localhost:3032/resetPassword', {
        method : 'POST',
        headers: { "Content-Type": "application/json" },
        mode: 'cors',
        body: JSON.stringify(request.body)
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch((error) => {
            console.error('Error:', error);
        });
    response.redirect("/userManagement");

})

module.exports = router;