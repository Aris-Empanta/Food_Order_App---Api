const db = require("../database/db")
const model = require("../models/ordersModel")

module.exports = {
    latestOrderId: (req, res) => {

        model.latestOrderId(db, (err, rows) => res.send(rows[0]))
    },
    saveNewOrder: (req, res) => {

        let order = req.body

        //Looping throught the total order to save the details to the database

        for(let i = 0; i < order.length; i++) {
            //The product's order details
            let orderDetails = [order[i].orderId, order[i].customerName,
                                order[i].customerMail, order[i].id,
                                order[i].name, order[i].quantity,
                                order[i].image, order[i].price]

            model.saveNewOrder(db, orderDetails)
        }
    }
}