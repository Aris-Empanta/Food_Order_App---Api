const express = require("express")
const app = express()
const port = process.env.PORT || 5000
const cors = require("cors")
const db = require('./database/db')

app.use(cors())

app.get("/", (req, res) => {
    
    let sql = "SELECT * FROM food"

    db.query(sql, (err, rows) => {
      if(err){
        console.log(err)
      }
      res.send(rows)
    })
})

app.listen(port, () => console.log(`App is listening on port ${port}`))