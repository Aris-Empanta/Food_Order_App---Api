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

doc.pipe(fs.createWriteStream('../invoices/invoice.pdf'));

doc.fontSize('24')
   .font('Helvetica-Bold')
   .fillColor("#303030")
   .text('INVOICE', 60, 80 )

doc.fontSize('12')
   .font('Helvetica-Bold')
   .fillColor("#303030")
   .text('ARIS RESTAURANT', 427, 80, { paragraphGap: 5 })

doc.fontSize('12')
    .font('Helvetica')
    .fillColor("#303030")
    .text('Eptanisou 12', {align: 'right'})

doc.fontSize('12')
    .font('Helvetica')
    .fillColor("#303030")
    .text('Kypseli, Athens', { align: 'right' })

doc.fontSize('12')
    .font('Helvetica')
    .fillColor("#303030")
    .text('11256', { align: 'right' })

doc.fontSize('12')
    .font('Helvetica')
    .fillColor("#303030")
    .text('Greece', { align: 'right' })

doc.fontSize('12')
    .font('Helvetica')
    .fillColor("#303030")
    .text('210-3456-782', { align: 'right',
                            paragraphGap: 50,
                            lineBreak: true})

doc.fontSize('13')
    .font('Helvetica')
    .fillColor("blue")
    .text('Billed to',  60, 250 )  

doc.fontSize('13')
    .font('Helvetica')
    .fillColor("blue")
    .text('Date issued',  460, 250 )  

doc.fontSize('12')
    .font('Helvetica')
    .fillColor('#303030')
    .text('Aris Empanta',  60, 270 )
    
doc.fontSize('12')
    .font('Helvetica')
    .fillColor('#303030')
    .text('Eptanissou 12 eeeeeeeeeeeeeeeeeeeee',  60, 285, { width: 150 } )

doc.fontSize('12')
    .font('Helvetica')
    .fillColor("#303030")
    .text('Date issued',  460, 270 )  


doc.fontSize('13')
    .font('Helvetica')
    .fillColor("blue")
    .text('Product', 60, 368)  

doc.fontSize('13')
    .font('Helvetica')
    .fillColor("blue")
    .text('Qty', 390, 370)  

doc.fontSize('13')
    .font('Helvetica')
    .fillColor("blue")
    .text('Price', 490, 370)  

let array = [ [ "1", '2', '3' ], 
              [ "4", '5', '6' ],
              [ "1", '2', '3' ], 
              [ "4", '5', '6' ],
              [ "1", '2', '3' ], 
              [ "4", '5', '6' ],
              [ "1", '2', '3' ], 
              [ "4", '5', '6' ],
              [ "g", '2', '3' ], 
              [ "4", '5', '6' ],
              [ "1", '2', '3' ], 
              [ "4", '5', '6' ],
              [ "1", '2', '3' ], 
              [ "4", '5', '6' ], ]
let verticalPosition = 410

const newPage = () => {

    verticalPosition = 100
    doc.addPage() 
}

for( let i = 0; i < array.length; i++ ) {

    doc.fontSize('12')
        .font('Helvetica')
        .fillColor("black")
        .text(array[i][0], 60, verticalPosition, { lineBreak: false })
        .fontSize('12')
        .font('Helvetica')
        .fillColor("black")
        .text(array[i][1], 395, verticalPosition, { lineBreak: false })
        .fontSize('12')
        .font('Helvetica')
        .fillColor("black")
        .text(array[i][2] + " EUR", 490, verticalPosition, { lineBreak: false }) 

        verticalPosition < 690 ? verticalPosition += 30 :
                                 newPage()
}

verticalPosition < 690 ? verticalPosition += 30 :
                                      newPage()

let total = "12" 
let totalPosition = 490 - (total.length - 1) * 5                                    

doc.fontSize('13')
    .font('Helvetica')
    .fillColor("blue")
    .text('Total Price: ', 350, verticalPosition)
    .fontSize('12')
    .font('Helvetica')
    .fillColor("black")
    .text(total + " EUR", totalPosition, verticalPosition)

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