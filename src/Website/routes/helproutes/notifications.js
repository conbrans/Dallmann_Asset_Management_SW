function sendMessage(messagetype) {
    return (req, res, next) => {
        if (!req.session[messagetype]) {
            switch (messagetype) {
                case "login":
                    if (!req.session.loginShown) {
                        req.toastr.success('Sie sind eingeloggt.',
                            title = 'Willkommen zurück  ' + req.session.username + '!',
                            options = {});
                    }
                    req.session.loginShown = true;
                    break;

                case "failedLogin":

                    req.toastr.error('Die Login Daten sind Ihre interne' +
                        ' Mail-Adresse (m.mustermann@dallmann-bau.de) und' +
                        ' ein personalisertes Passwort oder das' +
                        ' Standardpassword, welches vom Admin festgelegt' +
                        ' worden ist. ',
                        title = 'Login nicht möglich',
                        options = {});
                    break;


                case "booking" :
                    if (!req.session.bookingShown) {
                        req.toastr.error(
                            'Für das Gerät mit der Nummer 100420 endet die Reservierung ' +
                            'am 20.09.2020. ' +
                            'Bitte geben Sie es bis zu diesem Zeitraum wieder zurück.',
                            title = 'Ablaufende Resevrierung', options = {});
                    }
                    req.session.bookingShown = true;
                    break;

                case "editProfil":
                    req.toastr.success(
                        'Ihre Benutzerdaten wurden geupdatet, und sind beim' +
                        ' nächsten Login aktiv, bitte melden Sie sich ab und' +
                        ' wieder an, um die Veränderung zu sehen.',
                        title = 'Update war erfolgreich', options = {});
                    break;

                case "tuvUvv" :
                    if (!req.session.tuvUvvShown) {
                        req.toastr.error(
                            'Der TÜV-Status für das Gerät mit der Nummer : ' +
                            '100420 läuft ab.' +
                            'Nummer : 100020 ' +
                            'Geräteart : Winkelschleifer ' +
                            "Ablauf : '12/2020'",
                            title = 'Ablauf des TÜV-Status/ UVV-Status', options = {});
                    }
                    req.session.tuvUvvShown = true;
                    break;

                case "maintenance":
                    if (req.session.maintenanceShown){
                        req.toastr.info('In zwei Wochen steht für folgende Geräte eine ' +
                            'Wartung an:' +
                            'Gerätenummer:100230' +
                            'Geräteart : Winkelschleifer' +
                            'Datum : 20.08.2020<br>' +
                            'Wartungsarbeit : Putzen', title = 'Anstehende Wartung', options = {});
                    }
                    req.session.maintenanceShown = true;
                    break;
                default:
                    next();
            }
            next();
        } else next();
    }
}

module.exports =
    {
        sendMessage
    }


