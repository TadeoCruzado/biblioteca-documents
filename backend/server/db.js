const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    database: 'biblio',
    password: 'tsdiag144'
})

module.exports.pool = pool;