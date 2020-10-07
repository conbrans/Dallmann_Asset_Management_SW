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
    /**
     * PATH gewechselt, so dass es für alle funktioniert ;)
     */
    //path:
    // path.join('C:/Users/bvb-k/IdeaProjects/Dallmann_Asset_Management_SW/src/REST-API/ressources/logFiles/')

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

module.exports = router;





















/* router.logError = morgan(function (tokens, request, response) {
    return [
        tokens.method(request, response),
        tokens.url(request, response),
        tokens.status(request, response),
        tokens.res(request, response, 'content-length'), '-',
        tokens['response-time'](request, response), 'ms'
    ].join(' ')
});

router.test = morgan('dev', {

}) */



