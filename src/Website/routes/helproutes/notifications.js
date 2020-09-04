function sendLoginMessage() {
    return (req, res, next) => {
        if (!req.session.notificationShown) {

            req.toastr.success('Sie sind eingeloggt.',
                title = 'Willkommen zurück  ' + req.session.userName + '!',
                options = {});
            req.session.notificationShown = true;
            next();
        } else
            next();

    }
}

/*function sendBookingMessage()
{
    return (req,res,next) =>
    {
        if (!req.session.bookingNotificationShown)
        {
            req.toastr.

        }else
            next();
    }
}*/

module.exports =
    {
        sendLoginMessage

    }


