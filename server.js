const express = require("express")
const app = express()
const port = process.env.PORT || 5000
const cors = require("cors")
const db = require('./database/db')
const multer = require("multer")


//The middlewares needed to exchange data with frontend.
app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use("/images", express.static("uploads"))

//The multer object configurations to accept files
const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "uploads")
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname)
        
      }
})

//db.query("DELETE FROM Products", (error) => console.log(error))

//Restricting non-image files or large images also  here for extra safety
const upload = multer({storage: storage})

//The products' info
app.get("/products", (req, res) => {
    
    let sql = "SELECT * FROM Products"

    db.query(sql, (err, rows) => {
      res.send(rows)
    })
})



//The post endpoint to accept new product data
app.post("/products", upload.single("image"),  (req, res) => {    

    let category = req.body.category
    let name = req.body.name
    let id = req.body.id
    let currency = req.body.currency
    let quantity = req.body.quantity
    let deliveryPrice = req.body.deliveryPrice
    let takeAwayPrice = req.body.takeAwayPrice
    let description = req.body.description
    let image = "http://localhost:5000/images/" + req.body.imageName    
    let date = new Date()
        date = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() +
               "_" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()

    let sql = `INSERT INTO Products 
               VALUES (?, ?, ?, ?, ?, ?,  ?, ?, ?, ?)`

    db.query(sql,[category, name, currency, quantity, deliveryPrice, takeAwayPrice, description, date, image, id ] , (err, rows) => {
      /*if(err){
        console.log(err)
      } */
    })
    
})

app.put("/products", (req, res) => {
  let name = req.body.name
  let deliveryPrice = req.body.deliveryPrice
  let takeAwayPrice = req.body.takeAwayPrice
  let currency = req.body.currency
  let description = req.body.description
  let id = req.body.id

  console.log(id, name, deliveryPrice, takeAwayPrice, currency, description)

})

app.listen(port, () => console.log(`App is listening on port ${port}`))