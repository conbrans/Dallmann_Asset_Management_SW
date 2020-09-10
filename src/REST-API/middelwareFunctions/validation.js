const { body, validationResult } = require('express-validator');

 const deviceConstraints = [

    body('serialNumber').isInt().withMessage('Das Attribut \"Seriennummer\" muss angegeben werden und' +
        ' eine Zahlenkombination sein, wie z.B. 7742810'),
    body('guarantee').isDate().withMessage('Das Attribut \"Garantie\" muss angegeben werden und' +
        ' ein Datum mit folgendem Format sein: \"JJJJ-MM-DD\", wie z.B. 2022-12-23'),
    body('note'),
    body('deviceStatus').isInt({min: 1, max: 7}).withMessage('Das Attribut \"Gerätestatus\" muss' +
        ' angegeben werden und ein Ganzzahlenwert zwischen 1 und 7 sein.'),
    body('beaconMinor').notEmpty().withMessage('Das Attribut \"Beaconminor\" muss angegeben werden.'),
    body('beaconMajor').notEmpty().withMessage('Das Attribut \"Beaconmajor\" muss angegeben werden.'),
    body('model').notEmpty().withMessage('Das Attribut \"Modell\" muss angegeben werden und kann eine' +
        ' beliebige Zeichenkombination sein, wie z.B. Schnibbler Deluxe'),
    body('manufacturer').notEmpty().withMessage('Das Attribut \"Hersteller\" muss angegeben werden und' +
        ' kann eine beliebige Zeichenkombination sein, wie z.B. Husqvarna')

]

 const workerConstraints = [

     body('password').notEmpty().withMessage('Es muss ein Passwort angegeben werden.'),
     body('eMail').isEmail().withMessage('Die E-Mail muss folgendes Format haben:...'),
     body('firstName').notEmpty().withMessage('Es muss ein Vorname angegeben werden.'),
     body('surname').notEmpty().withMessage('Es muss ein Nachname angegeben werden'),
     body('role').notEmpty().withMessage('Dem neuen User muss eine Rolle zugewiesen werden.')

 ];


const workerUpdateConstraints = [

    body('eMail').isEmail().withMessage('Die E-Mail muss folgendes Format haben:...'),
    body('firstName').notEmpty().withMessage('Es muss ein Vorname angegeben werden.'),
    body('surname').notEmpty().withMessage('Es muss ein Nachname angegeben werden'),
    body('role').notEmpty().withMessage('Dem neuen User muss eine Rolle zugewiesen werden.')

];

 const reservationConstraints = [

    body('loanDay').isDate().withMessage('Das Ausleihdatum muss mit folgendem Format' +
        ' angegeben werden: \"JJJJ-MM-DD\", wie z.B. 2022-12-23 '),
    body('loanEnd').isDate().withMessage('Das Ausleihenddatum muss mit folgendem Format' +
        ' angegeben werden: \"JJJJ-MM-DD\", wie z.B. 2022-12-23 '),
    body('workerId').isInt().withMessage(''),
    body('inventoryNumber').isInt(),
    body('projectId').isInt()

]

module.exports = {

    deviceConstraints: deviceConstraints,
    workerConstraints: workerConstraints,
    workerUpdateConstraints : workerUpdateConstraints,
    reservationConstraints: reservationConstraints

}



