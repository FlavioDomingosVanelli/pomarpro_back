const mysql = require('mysql2/promise');

const config = {
    host:'localhost',
    user:'root',
    password:'',
    database:'pomarpro'
}

const connection = mysql.createPool(config);

module.exports = connection;