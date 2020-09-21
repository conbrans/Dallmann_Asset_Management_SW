const { body, validationResult } = require('express-validator');

 const deviceConstraints = [

    body('serialNumber').isInt().withMessage('Das Attribut Seriennummer muss angegeben werden und' +
        ' eine Zahlenkombination sein, wie z.B. 7742810'),
    body('guarantee').if(body('guarantee').notEmpty()).isDate().withMessage('Die Garantie muss mit folgendem Format' +
        ' angegeben werden: \"JJJJ-MM-DD\", wie z.B. 2022-12-23 '),
    body('note'),
    body('deviceStatus').isInt({min: 1, max: 7}).withMessage('Das Attribut Gerätestatus muss' +
        ' angegeben werden und ein Ganzzahlenwert zwischen 1 und 7 sein.'),
    body('beaconMinor'),
    body('beaconMajor'),
    body('model').notEmpty().withMessage('Das Attribut \"Modell\" muss angegeben werden und kann eine' +
        ' beliebige Zeichenkombination sein, wie z.B. Schnibbler Deluxe'),
    body('manufacturer').notEmpty().withMessage('Das Attribut \"Hersteller\" muss angegeben werden und' +
        ' kann eine beliebige Zeichenkombination sein, wie z.B. Husqvarna'),
    body('tuev').if(body('tuev').notEmpty()).isDate().withMessage('Die Garantie muss mit folgendem Format' +
        ' angegeben werden: \"JJJJ-MM-DD\", wie z.B. 2022-12-23 '),
    body('uvv').if(body('uvv').notEmpty()).isDate().withMessage('Die Garantie muss mit folgendem Format' +
        ' angegeben werden: \"JJJJ-MM-DD\", wie z.B. 2022-12-23 '),
    body('repair').if(body('repair').notEmpty()).isDate().withMessage('Das Repairdatum muss mit folgendem Format' +
        ' angegeben werden: \"JJJJ-MM-DD\", wie z.B. 2022-12-23 '),

]

 const workerConstraints = [

     body('password').notEmpty().withMessage('Es muss ein Passwort angegeben werden.').isLength({min: 6, max: 20}).withMessage('Das Passwort muss mindestens 6 und darf maximal 20 Zeichen lang sein'),
     body('eMail').isEmail().withMessage('Die E_Mail muss folgendes Format haben:...@dallmann.de'),
     body('firstName').notEmpty().withMessage('Es muss ein Vorname angegeben werden.'),
     body('surname').notEmpty().withMessage('Es muss ein Nachname angegeben werden'),
     body('role').notEmpty().withMessage('Dem neuen User muss eine Rolle zugewiesen werden.')

 ];


const workerUpdateConstraints = [

    body('eMail').isEmail().withMessage('Die E-Mail muss folgendes Format haben:...@dallmann.de'),
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



