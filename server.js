const express = require("express")
const app = express()
//Creating a new server for socket.io with express
const server = require('http').createServer(app)
//The socket.io server instance attached to an instance of http.Server.
const io = require('socket.io')(server, {
                                cors: {
                                origin: "*",
                                methods: ["GET", "POST"],
                                }
                            })
const port = process.env.PORT || 5000
const cors = require("cors")
const sockets = require("./socket_io/socket_io")(io)


//The middlewares needed to exchange data with frontend.
app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json())

//Importing routes
const productsRoute = require("./routes/products")
const chatRoute = require("./routes/chat")
const nodemailerRoute = require("./routes/nodemailer")
const ordersRoute = require("./routes/orders")
const customersRoute = require("./routes/customers")

app.use('/products', productsRoute)
app.use('/chat-messages', chatRoute)
app.use('/confirm-email', nodemailerRoute)
app.use('/orders', ordersRoute)
app.use('/customers', customersRoute)

server.listen(port, () => console.log(`Server is listening on port ${port}`))

const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument();

doc.pipe(fs.createWriteStream('./invoices/invoice.pdf'));

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