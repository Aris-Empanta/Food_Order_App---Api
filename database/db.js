//The configurations to connect to mysql database
const mysql = require('mysql2')
require("dotenv").config()

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.PORT 
  })

connection.connect((err) => { if(err) {
                                return console.error('error: ' + err.message);
                            } 
                            console.log("connected to snack bar database")})  

module.exports = connection