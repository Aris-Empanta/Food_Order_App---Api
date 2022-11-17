const db = require("../database/db")
const model = require("../models/ordersModel") 
const createInvoice = require("../functions/invoiceGenerator").createInvoice
const currentDate = require("../functions/functions").currentDate
const invoiceName = require("../functions/functions").invoiceName
const serverHost = require("../variables/variables").serverHost 
const sortByDate = require("../functions/functions").sortByDate

module.exports = {
    distinctOrders: (req, res) => {

        model.distinctOrders(db, (err, rows) => { if(err) console.log(err)
                                                  sortByDate(rows)                   
                                                  res.send(rows)} )
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
        let invoiceUrl = serverHost + "orders/invoices/" + invoice

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

        let number = req.query.number
        
        //The function below, will send to the requesting party only 10 of the orders
        //depending the requested number. 
        const sendOrders = (err, rows) => { 

                                            let ordersQuantity = rows.length
                                            let maximum = ordersQuantity - (number - 1) * 10
                                            let minimum = maximum > 10 ? maximum - 10 : 0

                                            let orders = rows.slice(minimum, maximum).reverse()

                                            res.send(orders)                                            
                                        }

        model.ordersById(db, sendOrders)
    },
    getOrdersAmount: (req, res) => {
        
        //The function to get all the groups of tens. For example, if orders = 70,
        // there are 7 groups, if orders = 72 there are 8 groups. The we make an
        //array containgn all numbers from 1 to the amount number.
        const getGroups = (rows) => {

            let amount = rows.length % 10  ===  0  ?  rows.length / 10 :
                         rows.length / 10 - (rows.length % 10 / 10) + 1
            
            let groups = []

            for( let i=1; i <= amount; i++ ) {

                groups.push(i)
            }

            return groups
        }

        model.ordersById(db, (err, rows) => {
                                               let groups = getGroups(rows)
                                               
                                               res.send(groups)
                                            })
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