let deviceObject = [
    'inventoryNumber',    'model',
    'manufacturer',       'serialNumber',
    'guarantee',          'note',
    'deviceCategory',     'categoryDescription',
    'deviceStatus',       'statusDescription',
    'beaconMajor',        'beaconMinor',
    'longitude',          'latitude',
    'lastLocationUpdate', 'lastTuev',
    'lastUvv',            'lastRepair',
    'repairNote',         'projectId',
    'buildingSite',       'street',
    'postcode',           'city',
    'lastChange'
]

let workerObject = [
    'workerId',      'password',
    'eMail',         'surname',
    'firstname',     'role',
    'bookingDevice', 'editDevice',
    'addDevice',     'viewDevice',
    'deleteDevice',  'addUser',
    'deleteUser',    'editUser',
    'deleteBooking', 'editBooking'
]


let createDeviceMessage = {

    "Message": "Gerät wurde erfolgreich hinzugefügt."

}


console.log(deviceObject.toString());

module.exports = {

    deviceObject,
    createDeviceMessage,
    workerObject

}