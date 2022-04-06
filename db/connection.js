const mysql = require('mysql2')

//connect to database-- add a mysql 12.2.3
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'MINT12345',
        database: 'tracker'
        },
        console.log('Connected to the tracker database.')
)

module.exports = db;