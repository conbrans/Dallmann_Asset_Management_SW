/**
 * Version 1.0
 * 06.10.2020
 *
 * @module /logger
 */

const morgan = require('morgan');
const express = require('express');
const rfs = require('rotating-file-stream');
const path = require('path');
const uuid = require('node-uuid');
const router = express();


const pad = num => (num > 9 ? "" : "0") + num;
const generator = (time, index) => {
    if (!time) return "request.log";

    var month = time.getFullYear() + "" + pad(time.getMonth() + 1);
    var day = pad(time.getDate());
    var hour = pad(time.getHours());
    var minute = pad(time.getMinutes());

    return `${month}/${month}${day}-${hour}${minute}-${index}-request.log`;
};

var requestLogStream = rfs.createStream(generator, {

    interval: '5d',
    path : '../ressources/logFiles/'

})

morgan.token('ID', function (request, response) { return 'WORKER_ID: '+request.body.workerId})
morgan.token('break', function () {return '\n'})
morgan.token('id', function getId (request) {return request.id})

router.logRequest = morgan('UUID\: :id :ID TIMESTAMP\: :date METHOD\: :method URL\: :url STATUS_CODE\: :status ´RESPONSE_TIME_IN\: :response-time ms :break  ', {

    stream: requestLogStream

});

 router.assignId = function (request, response, next) {

    request.id = uuid.v4()
    next()
}

//export of this module
module.exports = router;
























