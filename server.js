const express = require("express")
const app = express()
const port = process.env.PORT || 5000
const cors = require("cors")
const db = require('./database/db')
const multer = require("multer")

app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json())


const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "uploads")
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
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