const fetch = require('../helproutes/fetch');


//TODO function für Comission

/**
 * sends toastr notifcations
 * @param messagetype the type of message which will be send e.g. login or
 * failed login
 * @return {function(*, *, *): void}
 */
function sendMessage(messagetype) {
    return (req, res, next) => {
        if (!req.session[messagetype]) {
            switch (messagetype) {
                case "login":
                    if (!req.session.loginShown) {
                        req.toastr.success('Sie sind eingeloggt.',
                            title = 'Willkommen zurück  ' +
                                req.session.username + '!',
                            options = {
                                "showDuration": "300",
                                "hideDuration": "1000",
                                "timeOut": "5000",
                                "extendedTimeOut": "1000",
                            });
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
                        if (!req.session.bookingData) {
                            req.toastr.info("In den nächsten 14 Tagen müssen" +
                                " keine Geräte zurückgegeben werden.",
                                title = 'Ablaufende Reservierung', options = {});
                        } else  {
                            for (var i = 0; i < req.session.bookingData.length;
                                 i++) {
                                req.toastr.info(
                                    'Für das Gerät mit der Nummer '
                                    + req.session.bookingData[i].
                                        inventory_number + '' +
                                    ' endet die Reservierung ' +
                                    'am ' + req.session.bookingData[i].
                                        loan_end + '.' +
                                    'Bitte geben Sie es bis zu diesem' +
                                    ' Zeitraum wieder zurück.',
                                    title = 'Ablaufende Reservierung',
                                    options = {
                                        "showDuration": "0",
                                        "hideDuration": "0",
                                        "timeOut": "0",
                                        "extendedTimeOut": "0",
                                    });
                            }
                        }
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

                case "tuv" :
                    if (!req.session.tuvShown) {
                        if (!req.session.tuvData &&  req.session.role==="Werkstatt") {
                            req.toastr.info("Innerhalb der nächsten 30" +
                                " Tage stehen keine" +
                                " TÜV-Prüfungen an!", title = 'Ablauf des TÜV' +
                                ' Status', options = {});
                        } else {
                            for (var i = 0; i < req.session.tuvData.length;
                                 i++) {
                                req.toastr.warning(
                                    'Der TÜV-Status für das Gerät mit ' +
                                    'der Nummer : '
                                    + req.session.tuvData[i].inventory_number +
                                    ' läuft ab. ' +
                                    'Nummer : ' + req.session.tuvData[i].
                                        inventory_number +
                                    ' Geräteart : ' + req.session.tuvData[i].
                                        category +
                                    ' Ablauf : ' + req.session.tuvData[i].
                                        timestamp,
                                    title = 'Ablauf des TÜV-Status', options = {
                                        "showDuration": "0",
                                        "hideDuration": "0",
                                        "timeOut": "0",
                                        "extendedTimeOut": "0",
                                    });
                            }
                        }
                    }
                    req.session.tuvShown = true;
                    break;

                case "uvv" :
                    if (!req.session.uvvShown) {
                        if (!req.session.uvvData &&  req.session.role==="Werkstatt") {
                            req.toastr.info("Innerhalb der nächsten 30" +
                                " Tage stehen keine" +
                                " UVV-Prüfungen an!", title = 'Ablauf des UVV' +
                                ' Status', options = {});
                        } else {
                            for (var i = 0; i < req.session.uvvData.length;
                                 i++) {
                                req.toastr.warning(
                                    'Der UVV-Status für das Gerät mit der' +
                                    ' Nummer : '
                                    + req.session.uvvData[i].inventory_number +
                                    ' läuft ab. ' +
                                    'Nummer : ' + req.session.uvvData[i].
                                        inventory_number +
                                    ' Geräteart : ' + req.session.uvvData[i].
                                        category +
                                    ' Ablauf : ' + req.session.uvvData[i].
                                        timestamp,
                                    title = 'Ablauf des UVV-Status', options = {
                                        "showDuration": "0",
                                        "hideDuration": "0",
                                        "timeOut": "0",
                                        "extendedTimeOut": "0",
                                    });
                            }
                        }
                    }
                    req.session.uvvShown = true;
                    break;

                case "maintenance":
                    if (!req.session.maintenanceShown) {
                        if (!req.session.maintenanceData ) {
                            req.toastr.info("Innerhalb der nächsten 14 Tage" +
                                " Tage stehen keine" +
                                " Reparaturen an!", title = 'Anstehende' +
                                ' Reparaturen', options = {});
                        } else  {
                            console.log(req.session.maintenanceData);
                            for (var i = 0; i < req.session.maintenanceData.
                                length; i++) {
                                req.toastr.info('In zwei Wochen steht für' +
                                    ' folgendes Gerät eine ' +
                                    'Wartung an:' +
                                    'Gerätenummer: ' + req.session.
                                        maintenanceData[i].inventory_number +
                                    'Geräteart : ' + req.session.
                                        maintenanceData[i].category +
                                    'Datum : ' + req.session.
                                        maintenanceData[i].timestamp +
                                    'Wartungsarbeit : ' + req.session.
                                        maintenanceData[i].note + ' .',
                                    title = 'Anstehende Wartung', options = {});
                            }
                        }
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

module.exports = {
        sendMessage
    }