const db = require("../database/db")
const model = require("../models/ordersModel") 
const PDFDocument = require('pdfkit');
const fs = require('fs');
const currentDate = require("../functions/functions").currentDate
const invoiceName = require("../functions/functions").invoiceName

module.exports = {
    latestOrderId: (req, res) => {

        model.latestOrderId(db, (err, rows) => res.send(rows[0]))
    },
    latestCustomerOrder: (req, res) => {

        let mail = req.params.mail

        model.latestCustomerOrder(db, mail, (err, rows) => res.send(rows[0]) )
    },
    saveNewOrder: (req, res) => {

        let order = req.body

        let orderTotalPrice = order.map( item => item.price)
                                   .reduce( (previousValue, currentValue) => previousValue + currentValue, 0)

        let date = currentDate()

        let invoice = invoiceName(order[0].orderId)

        let invoiceUrl = "http://localhost:5000/orders/invoices/" + invoice

        //We create a pdf invoice using the pdfkit library
        const doc = new PDFDocument();

        doc.pipe(fs.createWriteStream('./invoices/' + invoice + '.pdf'));

        doc.text('hello world')

        doc.end()

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