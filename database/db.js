//The configurations to connect to mysql database
const mysql = require('mysql2')
require("dotenv").config()

const connection = mysql.createConnection({
    host: 'db4free.net',
    user: 'aris_empanta',
    password: process.env.DB_PASSWORD,
    database: 'aris_restaurant',
    port: "3306"
  })

connection.connect((err) => { if(err) {
                              console.log(err)
                            } 
                            console.log("connected to restaurant database")})  

module.exports = connection