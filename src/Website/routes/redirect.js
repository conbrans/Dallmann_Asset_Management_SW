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

const redirectHomeAdmin = (request, response, next) =>
{
    if (request.session.role !== 1)
    {
        response.redirect("/home");
        console.log("Zugriff verweigert, da kein Admin")
    } else {
        next();
    }
}

const redirectHomeWorkshop = (request, response, next) =>
{
    if (request.session.role !== 2)
    {
        response.redirect("/home");
        console.log("Zugriff verweigert, da kein Werkstattmitarbeiter")
    } else {
        next();
    }
}

const redirectHomeForeman = (request, response, next) =>
{
    if (request.session.role !== 3)
    {
        response.redirect("/home");
        console.log("Zugriff verweigert, da kein Polier")
    } else {
        next();
    }
}



module.exports =
    {
        redirectLogin: redirectLogin,
        redirectHome: redirectHome,
        redirectHomeAdmin : redirectHomeAdmin,
        redirectHomeWorkshop : redirectHomeWorkshop,
        redirectHomeForeman : redirectHomeForeman,

    }