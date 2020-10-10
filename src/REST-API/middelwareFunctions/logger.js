/**
 * Version 1.0
 * 06.10.2020
 *
 * @module /logger
 */


/**
 * Import of modules
 */

const morgan = require('morgan');
const express = require('express');
const rfs = require('rotating-file-stream');
const path = require('path');
const uuid = require('node-uuid');
const router = express();

//creating the log file system
const pad = num => (num > 9 ? "" : "0") + num;
const generator = (time, index) => {
    if (!time) return "request.log";

    var month = time.getFullYear() + "" + pad(time.getMonth() + 1);
    var day = pad(time.getDate());
    var hour = pad(time.getHours());
    var minute = pad(time.getMinutes());

    return `${month}/${month}${day}-${hour}${minute}-${index}-request.log`;
};

//creating the log stream/writing to log file
var requestLogStream = rfs.createStream(generator, {
    //interval for creating a new subfile
    interval: '1d',
    //path of log file system
    path: '../ressources/logFiles/'
})
//creating specified tokens for the logStream
morgan.token('ID', function (request, response) {
    return 'WORKER_ID: ' + request.body.workerId
})
morgan.token('break', function () {
    return '\n'
})
morgan.token('id', function getId(request) {
    return request.id
})

//logged stream format
router.logRequest = morgan('UUID\: :id :ID TIMESTAMP\: :date METHOD\: :method URL\: :url STATUS_CODE\: :status ´RESPONSE_TIME_IN\: :response-time ms :break  ', {

    stream: requestLogStream

});

//creating a UUID for every log
router.assignId = function (request, response, next) {

    request.id = uuid.v4()
    next()
}

//export of this module
module.exports = router;
























