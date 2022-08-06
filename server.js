const express = require("express")
const app = express()
const port = process.env.PORT || 5000
const mysql = require('mysql2')
const cors = require("cors")

app.use(cors())

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


app.get("/", (req, res) => {
    
    let sql = "SELECT * FROM food"

    connection.query(sql, (err, rows) => {
      if(err){
        console.log(err)
      }
      res.send(rows)
    })


})

app.listen(port, () => console.log(`App is listening on port ${port}`))