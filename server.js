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
const db = require('./database/db')

//The middlewares needed to exchange data with frontend.
app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json())

//db.query("DELETE FROM chat_messages")

//------> Socket.io configurations. <------
io.on('connection', (socket) => {   
    
   /*When server receives a message from a customer or admin, we dynamically create an event
     depending on customer's name, and emit it with the message to both parties.  */
   socket.on('chat message', (data) => {

         let name = data.username
         let sender = data.sender
         let message = data.message
         io.emit('customer ' + name, { message: message,
                                       sender: sender})
   })  
})

//------> Socket.io error handling from server. <------
io.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

//Importing routes
const productsRoute = require("./routes/products")
const chatRoute = require("./routes/chat")

app.use('/products', productsRoute)
app.use('/chat-messages', chatRoute)


server.listen(port, () => console.log(`App is listening on port ${port}`))