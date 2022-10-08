const db = require("../database/db")
const model = require("../models/ordersModel") 
const functions = require("../functions/functions")

module.exports = {
    latestOrderId: (req, res) => {

        model.latestOrderId(db, (err, rows) => res.send(rows[0]))
    },
    saveNewOrder: (req, res) => {

        let order = req.body

        let orderTotalPrice = order.map( item => item.price)
                                   .reduce( (previousValue, currentValue) => previousValue + currentValue, 0)

        let date = functions.currentDate()

       //Looping throught the total order to save the details to the database
       for(let i = 0; i < order.length; i++) {
            //The product's order details
            let orderDetails = [order[i].orderId, order[i].customerName,
                                order[i].customerMail, order[i].id,
                                order[i].name, order[i].quantity,
                                order[i].image, order[i].price,
                                order[i].checkedStatus, order[i].comments,
                                order[i].address, order[i].floor,
                                order[i].phone, date,
                                "EUR",order[i].unitPrice, orderTotalPrice ]
 
            model.saveNewOrder(db, orderDetails, (err) => { if(err) { console.log(err) 
                
            }})
        }
    },
    ordersById: (req, res) => {

        model.ordersById(db, (err, rows) => res.send(rows) )
    },
    getUnchecked: (req, res) => {

        model.getUnchecked(db, (err, rows) => res.send(rows) )
    },
    getSpecificOrder: (req, res) => {

        let id = req.params.id

        model.getSpecificOrder(db, id, (err, rows) => res.send(rows) )
    },
    getTotalPrice: (req, res) => {

        let id = req.params.id

        model.getTotalPrice(db, id, (err, rows) => res.send(rows[0]) )
    }
}