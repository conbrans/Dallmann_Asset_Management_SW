/**
 * checks if a specific user has the right to enter a specific page
 * @param right
 * @returns {function(*, *, *): void}
 */
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
        authRight
    }