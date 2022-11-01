const db = require("../database/db")
const model = require("../models/ordersModel") 
const createInvoice = require("../functions/invoiceGenerator").createInvoice
const currentDate = require("../functions/functions").currentDate
const invoiceName = require("../functions/functions").invoiceName
 

module.exports = {
    distinctOrders: (req, res) => {

        model.distinctOrders(db, (err, rows) => res.send(rows) )
    },
    latestOrderId: (req, res) => {

        model.latestOrderId(db, (err, rows) => res.send(rows[0]))
    },
    latestCustomerOrder: (req, res) => {

        let mail = req.params.mail

        model.latestCustomerOrder(db, mail, (err, rows) => res.send(rows[0]) )
    },
    saveNewOrder: (req, res) => {

        let order = req.body

        //The product's total price
        let orderTotalPrice = order.map( item => item.price)
                                   .reduce( (previousValue, currentValue) => previousValue + currentValue, 0)

        let date = currentDate()

        //The complex invoice file name to be distinctive
        let invoice = invoiceName(order[0].orderId) 

        //The invoice url to be saved to the database
        let invoiceUrl = "http://localhost:5000/orders/invoices/" + invoice

        //The method to create the invoice for the customer
        createInvoice(order, order[0].customerName, order[0].address, invoice, orderTotalPrice)

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
                                    "EUR",order[i].unitPrice, orderTotalPrice,
                                    invoiceUrl ]
 
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