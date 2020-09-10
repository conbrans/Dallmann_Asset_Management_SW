const express = require('express');
const router = express.Router();
const authentication = require('./helproutes/rightAuthentication');
const fetch = require('./helproutes/fetch');

//TODO BRAUCHT NICHT GETESTET WERDEN, da alle Bestandteile grundlegend schon getest worden sind
router.post("/addUser", authentication.authRight("add_user"), (request,response) =>
{
    fetch.postFetch("/api/user/createUser",request)
        .catch((error) => {
            console.error('Error:', error);
        });
    response.redirect("/userManagement");

});

router.post("/updateUser", authentication.authRight("edit_user"),
    function (request,response)
{

    fetch.putFetch("/api/user/updateUser/"+request.body.workerid,request)
        .then(() => response.redirect("back"))
        .catch((error) => {
            console.error('Error:', error);
        });
});

router.post("/deleteU", authentication.authRight("delete_user"),
    function (request,response)
{
    fetch.deleteFetch("/api/user/deleteUser/"+request.body.workerid, request)
        .catch((error) => {
            console.error('Error:', error);
        });
    response.redirect("/userManagement");
});

router.post("/resetPW",authentication.authRight("delete_user"),
    function (request,response)
{
    fetch.postFetch("resetPassword", request)
        .catch((error) => {
            console.error('Error:', error);
        });
    response.redirect("/userManagement");

});

module.exports = router;