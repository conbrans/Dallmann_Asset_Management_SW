const redirectLogin = (request, response, next) => {
    if (!request.session.userID) {
        response.redirect("/");
    } else {
        next();
    }
}


const redirectHome = (request, response, next) => {
    if (request.session.userID) {
        response.redirect("/home");
    } else {
        next();
    }
}

module.exports =
    {
        redirectLogin: redirectLogin,
        redirectHome: redirectHome,

    }