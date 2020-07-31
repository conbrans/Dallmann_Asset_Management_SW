var express = require('express');
var path = require('path');
const bodyParser = require('body-parser');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'Website/Views'));
app.set('view engine', 'ejs');
console.log(path.join(__dirname,'Website/views'));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'/Website/public')));
app.use(bodyParser.urlencoded({extended: false}));
console.log(path.join(__dirname,'/Website/public'))


module.exports = app;