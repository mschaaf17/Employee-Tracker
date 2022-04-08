//delete someone DELETE FROM parties WHERE id = 1; alter 12.3.4
// const res = require('express/lib/response')
// const db = require('./db/connection')
// const userResponses = require('./questions')

// //functions here
// const createEmployeeTable = () => {
// let sql = 'CREATE TABLE employee (id INTEGER AUTO_INCREMENT PRIMARY KEY, first_name VARCHAR(30) NOT NULL, last_name VARCHAR(30) NOT NULL, role_id INT, manager_id INT);'
// db.query (`InSERT INTO employee set?` (sql, err => {
// if (err) {
//     throw error
// }
// console.log('employee table created')
// })
// }

// const employeeData = () => {
//     let post = {`first_name: ${addedEmployeeData.firstName}, last_name: ${addEmployeeData.lastName}, role_id: ${addedEmployeeData.employeeRole}, manager_id: ${addedEmployeeData.employeeManager}`}
//     //this adds the dataset use altern later for add, change, information about employees
//     let sql = 'INSERT INTO employee SET ?'
//     let query = db.query(sql, err => {
//         if (err) {
//             throw err
//         }
//         console.log('employee insert')
//     })
// }
