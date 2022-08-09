const express = require("express")
const app = express()
const port = process.env.PORT || 5000
const cors = require("cors")
const db = require('./database/db')
const multer = require("multer")
//Multer middleware

app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json())

/*let sql= `CREATE TABLE Products(
              Category varchar(255),
              Name varchar(255),
              Currency varchar(255),
              Quantity int, 
              Delivery_price int,
              Take_away_price int,
              Description  varchar(255),
              Image_name varchar(255)
          )`

db.query(sql)*/
const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "uploads")
      },
      filename: (req, file, cb) => {
        cb(null, "tasos")
      }
})

const upload = multer({storage: storage})

app.get("/", (req, res) => {
    
    let sql = "SELECT * FROM food"

    db.query(sql, (err, rows) => {
      if(err){
        console.log(err)
      }
      res.send(rows)
    })
})

app.post("/products", upload.single("image"),  (req, res) => {
    

    let category = req.body.category
    let name = req.body.name
    let currency = req.body.currency
    let quantity = req.body.quantity
    let deliveryPrice = req.body.deliveryPrice
    let takeAwayPrice = req.body.takeAwayPrice
    let description = req.body.description
    let image = req.body.image
   
    console.log(req.file, req.body)
    let sql = `INSERT INTO Products 
               VALUES (?, ?, ?, ?, ?, ?,  ?, ?)`

    db.query(sql,[category, name, currency, quantity, deliveryPrice, takeAwayPrice, description, image ] , (err, rows) => {
      if(err){
        console.log(err)
      } else{
        res.send(rows)
      }
    })
})

app.listen(port, () => console.log(`App is listening on port ${port}`))