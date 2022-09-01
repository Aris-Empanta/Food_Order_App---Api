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

          //Sending the real time message to the appropriate sender and receive
          io.emit('customer ' + name, { message: message,
              sender: sender})
              
          io.emit('new message')

          /* Saving transferred messages to the database. Also setting the condition that 
           admin's messages are not marked as unread to the admin's inbox*/
          if( sender === 'admin' ) {

                db.query(`INSERT INTO chat_messages VALUES (?,?,?,?)`,
                          [name, sender, message, 'read'])
            } else {

                db.query(`INSERT INTO chat_messages VALUES (?,?,?,?)`, 
                          [name, sender, message, 'unread'])
            }         
   }) 
   
   //Once admin private chat is open, no received message can have unread status
   socket.on('inbox zero', (sender) => {
          
           db.query("UPDATE chat_messages SET Read_status = 'read' WHERE Sender=" + db.escape(sender))
   })
   
   //Real time order sending from customer's app to admin dashboard
   socket.on('send order', (data) => {
    console.log(data)
    io.emit('new order', data)
   }) 

  //Updates the unread message indicator on navbar 
  socket.on('update navbar', () => {

    socket.emit('re-evaluate unread')
  })
  
  //When we click on a conversation in chat dashboard with a customer, it makes unread messages with him 0.
  socket.on('message read', (sender) => {

    db.query("UPDATE chat_messages SET Read_status = 'read' WHERE Sender=" + db.escape(sender))
  })
  
  //The 2 listeners below emit notication to the admin that a specific customer is typing a message.
  socket.on('I type', (data) => io.emit(data + ' is typing') )

  socket.on('No typing', (data) => io.emit(data + " not typing") )

  //The 2 listeners below emit notication to a specific customer that admin is typing a message.
  socket.on('Admin typing', (data) => io.emit('Admin typing to ' + data) )

  socket.on('Admin not typing', (data) => io.emit('Admin not typing to ' + data) )
})


//Importing routes
const productsRoute = require("./routes/products")
const chatRoute = require("./routes/chat")

app.use('/products', productsRoute)
app.use('/chat-messages', chatRoute)

app.listen(port, () => console.log(`App is listening on port ${port}`))
server.listen(5001, () => console.log(`Socket is listening on port 5001`))