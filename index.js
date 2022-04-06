const res = require('express/lib/response')
const db = require('./db/connection')
const userResponses = require('./questions')

//functions here
const createEmployeeTable = () => {
let sql = 'CREATE TABLE employee (id INTEGER AUTO_INCREMENT PRIMARY KEY, first_name VARCHAR(30) NOT NULL, last_name VARCHAR(30) NOT NULL, role_id INT, manager_id INT);'
db.query(sql, err => {
if (err) {
    throw error
}
console.log('employee table created')
})
}

const employeeData = () => {
    let post = {first_name: 'John', last_name: 'Doe', role_id: 'Engineer', manager_id: 'Mike'}
    let sql = 'INSERT INTO employee SET ?'
    let query = db.query(sql, err => {
        if (err) {
            throw err
        }
        console.log('employee insert')
    })
}
