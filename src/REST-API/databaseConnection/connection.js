const mysql = require('mysql');
const connection = mysql.createConnection({
    host: '131.173.64.49',
    user: 'dallmann_am',
    password: 'Eib5choowu',
    database: 'dallmann_am2020',
    url: 'jdbc:mysql://131.173.64.49:3306/dallmann_am2020?serverTimezone=gmt'
});
connection.connect((err) => {
    if(err){
        console.log('Error connecting to Db');
        return;
    }
    console.log('Connection established');
});

module.exports = connection;
