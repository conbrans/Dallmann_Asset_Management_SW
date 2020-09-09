const express = require('express');
const router = express.Router();
const redirect = require('./helproutes/redirect');
const fetch = require('./helproutes/fetch');

//TODO BRAUCHT NICHT GETESTET WERDEN, da alle Bestandteile grundlegend schon getest worden sind
router.post("/addUser", redirect.authRight("add_user"), (request,response) =>
{
    fetch.postFetch("user",request)
        .catch((error) => {
            console.error('Error:', error);
        });
    response.redirect("/userManagement");

});

router.post("/updateUser", redirect.authRight("edit_user"),
    function (request,response)
{
    fetch.postFetch("updateUser",request)
        .catch((error) => {
            console.error('Error:', error);
        });
    response.redirect("/userManagement");

});



router.post("/deleteU", redirect.authRight("delete_user"),
    function (request,response)
{
    fetch.postFetch("deleteUser", request)
        .catch((error) => {
            console.error('Error:', error);
        });
    response.redirect("/userManagement");
});

router.post("/resetPW",redirect.authRight("delete_user"),
    function (request,response)
{
    fetch.postFetch("resetPassword", request)
        .catch((error) => {
            console.error('Error:', error);
        });
    response.redirect("/userManagement");

})

module.exports = router;