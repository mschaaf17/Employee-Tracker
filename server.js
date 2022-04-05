const express = require("express");
const mysql = require('mysql2')

//create and run the port
const PORT = process.env.PORT || 3001;
const app = express();

//express middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//connect to database-- add a mysql 12.2.3
const db = mysql.createConnection(
    {
        host: 'localhost',
        //your mysql username,
        user: 'root',
        //your swl password
        password: 'MINT12345',
        database: 'election'
        },
        console.log('Connected to the election database.')
)



//check port connection-- npm start http://localhost:3001/
app.get('/', (req, res)=> {
    res.json({
        message: 'Hello World'
    })
})

//this should show the resulting rows that match query-- query the database to test the connection
//use this to view a all candidates or the codes below to delete or view single candidate
db.query(`SELECT * FROM candidates`, (err, rows)=> {
    console.log(rows)
})
//this should show the resulting rows that match query
// db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row)=> {
//     if (err) {
//         console.log(err)
//     } 
//     console.log(row)
// })

//delete a candidate
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//     if (err) {
//         console.log(err)
//     }
//     console.log(result)
// })

//you can add the defult response if the wrong query string is added to the url- 12.2.3
//if you use this it needs to be the last one
app.use((req, res) => {
    res.status(404).end()
})

//start the server on port 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


//create questions and the answers wil go into the seeds.sql to form the table
//allow user to create a new person 12.3.3-- this will show you how to creat and combine the tables
//you will need 12.3.4 to update the employee because you are able to edit the employee in the last question
//use put tp update employee information 12.3.7
//12.4 seems to be everything i need for this project! 12.4.6