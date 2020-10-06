const { body, validationResult } = require('express-validator');
const deviceConstraints = [
    body('serialNumber').notEmpty().withMessage('Das Attribut Seriennummer muss angegeben werden und' +
        ' eine Zahlenkombination sein, wie z.B. 7742810'),
    body('deviceStatus').if(body('deviceStatus')).isInt({min: 1, max: 7}).withMessage('Das Attribut Gerätestatus muss' +
        ' angegeben werden und ein Ganzzahlenwert zwischen 1 und 7 sein.'),
    body('model').notEmpty().withMessage('Das Attribut Modell muss angegeben werden und kann eine' +
        ' beliebige Zeichenkombination sein, wie z.B. Schnibbler Deluxe'),
    body('manufacturer').notEmpty().withMessage('Das Attribut Hersteller muss angegeben werden und' +
        ' kann eine beliebige Zeichenkombination sein, wie z.B. Husqvarna'),
    body('category').if(body('category').notEmpty()).isInt({min: 1, max: 8}).withMessage('Die angegebende Kategorie ist nicht vorhanden.')
];
const workerConstraints = [
    body('password').notEmpty().withMessage('Es muss ein Passwort angegeben werden.').isLength({min: 6, max: 20}).withMessage('Das Passwort muss mindestens 6 und darf maximal 20 Zeichen lang sein'),
    body('eMail').isEmail().withMessage('Die E_Mail muss folgendes Format haben:...@dallmann-bau.de'),
    body('firstName').notEmpty().withMessage('Es muss ein Vorname angegeben werden.'),
    body('surname').notEmpty().withMessage('Es muss ein Nachname angegeben werden'),
    body('role').notEmpty().withMessage('Dem neuen User muss eine Rolle zugewiesen werden.')
];
const workerUpdateConstraints = [
    body('eMail').isEmail().withMessage('Die E-Mail muss folgendes Format haben:...@dallmann-bau.de'),

];

const createReservationConstraints = [

    body('workerId').isInt().withMessage(''),
    body('inventoryNumber').isInt(),
    body('projectId').isInt()

]

const deleteReservationConstraints = [

    body('inventoryNumber').notEmpty()
        .withMessage('Die Inventarnummer muss angegeben werden').isInt()
        .withMessage('Die Inventarnummer muss ein Integer,' +
            ' also ein sechstelliger Zahlenwert sein'),
    body('loanDay').notEmpty().withMessage('Das Ausleihdatum' +
        ' muss angegeben werden.'),
    body('loanEnd').notEmpty().withMessage('Das Ausleihenddatum' +
        ' muss angegeben werden.')

]

module.exports = {

    deviceConstraints: deviceConstraints,
    workerConstraints: workerConstraints,
    workerUpdateConstraints : workerUpdateConstraints,
    createReservationConstraints: createReservationConstraints,
    deleteReservationConstraints: deleteReservationConstraints

}