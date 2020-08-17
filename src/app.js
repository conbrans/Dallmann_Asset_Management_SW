const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');



const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'Website/Views'));
app.set('view engine', 'ejs');


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'/Website/public')));
app.use(express.static(path.join(__dirname,'/Website/private')));
app.use(bodyParser.urlencoded({extended: true}));


module.exports = app;