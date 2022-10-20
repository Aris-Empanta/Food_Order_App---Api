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
   .text('INVOICE')

doc.fontSize('12')
   .font('Helvetica-Bold')
   .fillColor("#303030")
   .text('ARIS RESTAURANT', {align: 'right'})

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
                            paragraphGap: 50})

doc.fontSize('12')
    .font('Helvetica')
    .fillColor("blue")
    .text('Billed to: ', { align: 'left'})
            

doc.end()