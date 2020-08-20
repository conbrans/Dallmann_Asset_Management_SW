
/**
 * redirects the User to login, if there is no userID, the userID is set when the user is logged in
 * @param request
 * @param response
 * @param next
 */
const redirectLogin = (request, response, next) => {
    if (!request.session.userID) {
        response.redirect("/");
    } else {
        next();
    }
}

/**
 * redirects a user to home if he is already logged in
 * @param request
 * @param response
 * @param next
 */
const redirectHome = (request, response, next) => {
    if (request.session.userID) {
        response.redirect("/home");
    } else {
        next();
    }
}

//bei dieser funktion
function authRight(right)
{
    return (request, response, next) =>
    {
        // toLowercase, um Fehler bei den redirects zu vermeiden
        var righttoLowerCase = right.toLowerCase();
                if (request.session.rights[righttoLowerCase] === 0)
                {
                    response.redirect("/home");
                }else
                {
                    next();
                }
    }
}



module.exports =
    {
        redirectLogin: redirectLogin,
        redirectHome: redirectHome,
       /* redirectHomeAdmin : redirectHomeAdmin,
        redirectHomeWorkshop : redirectHomeWorkshop,
        redirectHomeForeman : redirectHomeForeman,*/
        authRight
    }