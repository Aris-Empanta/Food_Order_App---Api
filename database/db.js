//The configurations to connect to mysql database
const mysql = require('mysql2')
require("dotenv").config()

const connection = mysql.createConnection({
    host: "eris.myip.gr",
    user: "arisdb_snackbar_data",
    password: process.env.DB_PASSWORD,
    database: "arisdb_snackbar_data",
    port: "3306" 
  })

connection.connect((err) => { if(err) {
                                return console.error('error: ' + err.message);
                            } 
                            console.log("connected to snack bar database")})  

module.exports = connection