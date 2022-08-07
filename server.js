const express = require("express")
const app = express()
const port = process.env.PORT || 5000
const cors = require("cors")
const db = require('./database/db')
const bodyParser = require("body-parser")

app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.get("/", (req, res) => {
    
    let sql = "SELECT * FROM food"

    db.query(sql, (err, rows) => {
      if(err){
        console.log(err)
      }
      res.send(rows)
    })
})

app.post("/foods", (req, res) => {
    

    let category = req.body.category

    let sql = "ALTER TABLE food ADD " + category +" VARCHAR(20) NOT NULL"

    db.query(sql, (err, rows) => {
      if(err){
        console.log(err)
      } else{
        res.send(rows)
      }
    })
})

app.listen(port, () => console.log(`App is listening on port ${port}`))