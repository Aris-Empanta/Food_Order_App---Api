const express = require("express")
const router = express.Router()
const db = require('../database/db')
const multer = require("multer")
const fs = require("fs")

router.use("/images", express.static("uploads"))

//------> The multer object configurations to accept files <------
const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "uploads")
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname)
        
      }
})

const upload = multer({storage: storage})

//------> The products' info api endpoint <------
router.get("/", (req, res) => {
    
    let products = "SELECT * FROM Products"

    db.query(products, (err, rows) => {
      res.send(rows)
    })

})

//------> The products' categories api endpoint <------
router.get("/categories", (req, res) => {
    
  let products = "SELECT * FROM Products GROUP BY Category"

  db.query(products, (err, rows) => {
    res.send(rows.map(item => item.Category))
  })

})

//------> The products' by desired category api endpoint <------
router.get("/by-category/:category", (req, res) => {
  
  let category = req.params.category
  let products = "SELECT * FROM Products WHERE Category = " + db.escape(category)

  db.query(products, (err, rows) => {
    res.send(rows)
  })

})

//------> The post endpoint to accept new product data <------
router.post("/add/:id", upload.single("image"),  (req, res) => {    

    let id = req.params.id
    let category = req.body.category
    let name = req.body.name    
    let currency = req.body.currency
    let quantity = req.body.quantity
    let deliveryPrice = req.body.deliveryPrice
    let takeAwayPrice = req.body.takeAwayPrice
    let description = req.body.description
    let image = "http://localhost:5000/products/images/" + req.body.imageName    
    let date = new Date()
        date = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() +
               "_" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()

    let sql = `INSERT INTO Products 
               VALUES (?, ?, ?, ?, ?, ?,  ?, ?, ?, ?)`

    db.query(sql,[category, name, currency, quantity, deliveryPrice, takeAwayPrice, description, date, image, id ] , (err, rows) => {
      if(err){
        console.log(err)
      } 
    })
    
})

//------> The api endpoint to change a product's image <------
router.post("/update-image/:id", upload.single("newImage"), (req, res) => {

  let newImage = "http://localhost:5000/products/images/" + req.file.filename
  let id = req.params.id
  let date = new Date()
  date = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() +
         "_" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()


  let fetchImage = `SELECT * FROM Products WHERE ID=${id}`
  let oldImage

  //Fetching the old image name to delete the image file
  db.query(fetchImage, (err, rows) => {
    if (err) throw err;
    oldImage = rows[0]["Image_name"].split("http://localhost:5000/products/images/")
    
    fs.unlink("uploads/" + oldImage[1], (err) => {
      if (err) throw err;
      console.log('Image deleted!');
    })
  })
  
  let updateImage = `UPDATE products SET Date = ?, 
                                         Image_name = ?                                              
                                     WHERE ID = ?`
  db.query(updateImage, [date, newImage, id], (err) => {
                                                              if (err) throw err;
                                                              console.log('Image updated!');
                                                            })        
})

//------> The api endpoint to modify the product's info <------
router.put("/update-characteristics/:id", (req, res) => {

  let id = req.params.id
  let date = req.body.date
  let name = req.body.name
  let deliveryPrice = req.body.deliveryPrice
  let takeAwayPrice = req.body.takeAwayPrice
  let currency = req.body.currency
  let description = req.body.description  



  sql = `UPDATE products SET Date = ?,
                             Name = ?,
                             Delivery_price = ?,
                             Take_away_price = ?,
                             Currency = ?,
                             Description = ?                            
                         WHERE id = ?`

  db.query(sql,
           [date, name, deliveryPrice, takeAwayPrice, currency, description, id ],
           (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send(result);
            }
          }
        )


})

//------> The api endpoint to delete a product <------
router.delete("/delete-product/:id", (req, res) => {

   let id = req.params.id
   let fetchImage = `SELECT * FROM products WHERE ID=${id}`
   let image
 
   //Fetching the old image name to delete the image file
   db.query(fetchImage, (err, rows) => {
     if (err) throw err;
     image = rows[0]["Image_name"].split("http://localhost:5000/products/images/")
          
     fs.unlink("uploads/" + image[1], (err) => {
       if (err) throw err;
       console.log('Image deleted!');
     })
   })
   
   //Now we delete the whole product's data
   let deleteProduct = `DELETE FROM products WHERE ID = ${id}`

   db.query(deleteProduct, (err, rows) => {
    if (err) throw err;
    console.log("Product deleted")
   })
})

module.exports = router