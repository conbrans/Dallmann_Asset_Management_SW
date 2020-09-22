/**
 * redirects the User to login, if there is no userID,
 * the userID is set when the user is logged in
 * @param req
 * @param res
 * @param next
 */
const redirectLogin = (req, res, next) => {
    if (!req.session.userID) {
        res.status(403).redirect("/");
    } else {
        next()
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
        res.status(403).redirect("/home");
    } else {
        next();
    }
}

module.exports =
    {
        redirectLogin: redirectLogin,
        redirectHome: redirectHome,
    }