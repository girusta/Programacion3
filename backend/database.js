const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'axgonz07',
    database: 'lavaderogi2024',
    multipleStatements: true
});

connection.connect(function (err){
    if(err) {
        console.log(err);
        return;
    } else {
        console.log('DB ESTA CONECTADA');
    }
});

module.exports = connection.promise();