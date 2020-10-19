/**
 * redirects the User to login, if there is no userID,
 * the userID is set when the user is logged in
 * @param req request
 * @param res result
 * @param next next
 */
const redirectLogin = (req, res, next) => {
	if (!req.session.userID) {
		res.redirect(401,"/");
	} else {
		next();
	}
};

/**
 * redirects a user to home if he is already logged in
 * @param req request
 * @param res result
 * @param next next
 */
const redirectHome = (req, res, next) => {
	if (req.session.userID) {
		res.redirect(403,"/home");
	} else {
		next();
	}
};

module.exports = {
	redirectLogin: redirectLogin,
	redirectHome: redirectHome,
};