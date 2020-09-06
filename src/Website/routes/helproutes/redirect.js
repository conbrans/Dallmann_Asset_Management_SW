/**
 * redirects the User to login, if there is no userID,
 * the userID is set when the user is logged in
 * @param req
 * @param res
 * @param next
 */
const redirectLogin = (req, res, next) => {
    if (!req.session.userID) {
        res.redirect("/");
    } else {
        next();
    }
}

/**
 * redirects a user to home if he is already logged in
 * @param req
 * @param res
 * @param next
 */
const redirectHome = (req, res, next) => {
    if (req.session.userID) {
        res.redirect("/home");
    } else {
        next();
    }
}

//bei dieser funktion
function authRight(right) {
    return (req, res, next) => {
        {
            // toLowercase, um Fehler bei den redirects zu vermeiden
            if (req.session.rights[right.toLowerCase()] === 0) {
                res.redirect("/home");
            } else {
                next();
            }
        }
    }
}


module.exports =
    {
        redirectLogin: redirectLogin,
        redirectHome: redirectHome,
        authRight
    }