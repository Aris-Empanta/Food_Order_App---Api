const db = require('../database/db')
const productsModel = require("../models/productsModel")

module.exports = {
    getAllProducts : (req, res) => {

        productsModel.get(db, (err, rows) => {

          res.send(rows)
        } )
    },
    getProductCategories : (req, res) => {
    
      productsModel.getCategories(db, (err, rows) => {

        res.send(rows.map(item => item.Category))
      })    
    },
    getByCategory : (req, res) => {
  
      let category = req.params.category
    
      productsModel.getByCategory(db, category,  (err, rows) => {
        res.send(rows)
      })    
    },
    getById : (req, res) => {
  
      let id = req.params.id 
    
      productsModel.getById(db, id, (err, rows) => {
        res.send(rows)
      })
    }
}