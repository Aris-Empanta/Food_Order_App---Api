//The configurations to connect to mysql database
const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'sql11.freemysqlhosting.net',
    user: 'sql11511034',
    password: '7mJh3f3LPl',
    database: 'sql11511034',
    port: "3306"
  })

connection.connect((err) => { if(err) {
                              console.log(err)
                            } 
                            console.log("connected to restaurant database")})  

module.exports = connection