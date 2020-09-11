/**
 * Import of node packages and Modules
 */
const express = require('express');
const router = express.Router();
const authentication = require('./helproutes/rightAuthentication');
const fetch = require('./helproutes/fetch');

router.post("/addUser", authentication.authRight("add_user"), (req,res) => {
    fetch.postFetch("/api/user/createUser",req)
        .catch((error) => {
            console.error('Error:', error);
        });
    res.redirect("/userManagement");

});

router.post("/updateUser", authentication.authRight("edit_user"),(req,res)=> {
    fetch.putFetch("/api/user/updateUser/"+req.body.workerid,req)
        .then(() => res.redirect("back"))
        .catch((error) => {
            console.error('Error:', error);
        });
});

router.post("/deleteU", authentication.authRight("delete_user"),(req,res)=> {
    fetch.deleteFetch("/api/user/deleteUser/"+req.body.workerid, req)
        .catch((error) => {
            console.error('Error:', error);
        });
    res.redirect("/userManagement");
});

router.post("/resetPW",authentication.authRight("delete_user"),(req, res)=>
{
    fetch.postFetch("resetPassword", req)
        .catch((error) => {
            console.error('Error:', error);
        });
    res.redirect("/userManagement");

});

module.exports = router;