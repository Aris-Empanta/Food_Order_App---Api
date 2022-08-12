//The configurations to connect to mysql database
const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'marinehq1991',
    database: 'restaurant',
    port: "3306"
  })

connection.connect((err) => { if(err) {
                              console.log(err)
                            } 
                            console.log("connected to restaurant database")})  

module.exports = connection