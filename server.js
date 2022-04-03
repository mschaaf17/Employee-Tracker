const express = require("express");

//create and run the port
const PORT = process.env.PORT || 3001;
const app = express();

//express middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


//check port connection-- npm start http://localhost:3001/
app.get('/', (req, res)=> {
    res.json({
        message: 'Hello World'
    })
})
//you can add the defult response if the wrong query string is added to the url- 12.2.3
//if you use this it needs to be the last one
app.use((req, res) => {
    res.status(404).end()
})

//start the server on port 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
