const db = require('../database/db')
const model = require("../models/productsModel")
const fs = require("fs")

//All the controllers for the product's CRUD operation
module.exports = {
    getAllProducts : (req, res) => {

      model.getProducts(db, (err, rows) => {

          res.send(rows)
        } )
    },
    getProductCategories : (req, res) => {
    
      model.getCategories(db, (err, rows) => {

        res.send(rows.map(item => item.Category))
      })    
    },
    categoriesWithImage : (req, res) => {

      model.getCategories(db, (err, rows) => {

        res.send(rows.map( item => {

          let object = {}

          object['category'] = item.Category
          object['image'] = item.Image_name

          return object
        }))
      })
    },
    getByCategory : (req, res) => {
  
      let category = req.params.category
    
      model.getByCategory(db, category,  (err, rows) => {
        res.send(rows)
      })    
    },
    getById : (req, res) => {
  
      let id = req.params.id 
    
      model.getById(db, id, (err, rows) => {
        res.send(rows)
      })
    },
    addProduct : (req, res) => {    

      let id = req.params.id
      let category = req.body.category
      let name = req.body.name    
      let currency = 'EUR'
      let price = req.body.price
      let description = req.body.description
      let image = "http://localhost:5000/products/images/" + req.body.imageName    
      let date = new Date()
          date = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() +
                 "_" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
      let productAttributes = [ category, name, currency, price,
                                description, date, image, id ]
        
      model.addProduct( db, productAttributes, (err, rows) => {
        if(err){
          console.log(err)
        } 
      })    
    },
    changeImage :  (req, res) => {

      let newImage = "http://localhost:5000/products/images/" + req.file.filename
      let id = req.params.id
      let date = new Date()
      date = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() +
             "_" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
      let oldImage
      let newImageAttributes = [date, newImage, id]
      
      model.deleteOldImage( db, id, (err, rows) => {
                                      if (err) throw err;
                                      oldImage = rows[0]["Image_name"]
                                                 .split("http://localhost:5000/products/images/")
                                      
                                      fs.unlink("uploads/" + oldImage[1], (err) => { 
                                                                                      if (err) throw err; 
                                                                                    } 
                                                                                )
                                    })    

      model.updateImage( db, newImageAttributes, (err) =>  { 
                                                              if(err) throw err; 
                                                            } 
                                                          )              
    },
    editProduct : (req, res) => {

      let id = req.params.id
      let date = req.body.date
      let name = req.body.name
      let price = req.body.price
      let currency = req.body.currency
      let description = req.body.description  
      let attributes = [date, name, price, currency, description, id ]
      
      model.editProduct( db, attributes, (err, result) => {
                                                            if (err) throw err
                                                                res.send(result);                                                                    
                                                            })   
    },
    deleteProduct :  (req, res) => {

      let id = req.params.id
      let image 
      
      model.deleteProductImage( db, id, (err, rows) => {
                                                         if (err) throw err;
                                                            image = rows[0]["Image_name"]
                                                                    .split("http://localhost:5000/products/images/")
                                                                    
                                                            fs.unlink("uploads/" + image[1], (err) => {
                                                                  if (err) throw err;
                                                                })
                                                        })
      
      model.deleteProduct( db, id, (err, rows) => {
                                                    if (err) throw err;
                                                  })      
   }
}