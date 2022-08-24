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

//------> Inserting messages and sender's name to the database. <------
app.post('/chat-messages', (req, res) => {
      let message = req.body.message 
      let name = req.body.username

      db.query(`INSERT INTO chat_messages
                VALUES (?,?)`, [name, message])
})


//------> Fetching all customer's name <------

app.get('/chat-messages/customers', (req, res) => {

      db.query("SELECT * FROM chat_messages GROUP BY Name", (err, rows) => {
            res.send(rows)
        })
})

//------> Fetching all messages and sender's name from the database <------
app.get('/chat-messages', (req, res) => {
      db.query(`SELECT * FROM chat_messages `, (err, rows) => {
                res.send(rows)
            })
})

//db.query(`DELETE FROM chat_messages`)

//------> Socket.io configurations. <------
io.on('connection', (socket) => {   
    
   
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

app.use('/products', productsRoute)


server.listen(port, () => console.log(`App is listening on port ${port}`))