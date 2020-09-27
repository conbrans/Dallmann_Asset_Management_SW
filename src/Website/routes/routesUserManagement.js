/**
 * Import of node packages and Modules
 */
const express = require('express');
const router = express.Router();
const authentication = require('./helproutes/rightAuthentication');
const fetch = require('./helproutes/fetch');
const crypto = require('./helproutes/crypto');

router.post("/addUser", authentication.authRight("add_user"), (req,res) => {
    fetch.postFetch("/api/user/createUser",req)
        .catch((error) => {
            console.error('Error:', error);
        });
    res.redirect("/userManagement");

});

router.post("/editUser", authentication.authRight("edit_User"),(req, res) =>
{
    const passwordEncrypt = crypto.encrypt(req.body.password);
    const passwordCorrectEncrypt = crypto.encrypt(req.body.passwordCorrect);

    if (passwordEncrypt.encryptedData===passwordCorrectEncrypt.encryptedData)
    {
        req.body.password= passwordEncrypt;


        fetch.postFetch("/api/user/editProfile/" + req.session.userID,req)
            .then(res.redirect("/editProfil"))
            .catch((error)=>
            {
                console.error('Error:',error);
            });
    }
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
        .then(() => res.redirect("/userManagement"))
        .catch((error) => {
            console.error('Error:', error);
        });
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