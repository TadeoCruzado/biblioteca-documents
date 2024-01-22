const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: 'b7ylezkfqjsqqf6btetm-mysql.services.clever-cloud.com',
    port: 3306,
    user: 'usbujab5nhppdxfp',
    database: 'b7ylezkfqjsqqf6btetm',
    password: 'kUAmcBpj3pv8gLFGk4Qd'
})

module.exports.pool = pool;