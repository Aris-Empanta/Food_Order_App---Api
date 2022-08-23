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

//The middlewares needed to exchange data with frontend.
app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json())





io.on('connection', (socket) => {

   socket.on('chat message', (data) => {
         room = data.username
         message = data.message
         //Customer enters the room with his name
         socket.join(room)
         //Sending message and data to admin. Admin receives the message and joins customer's room
         io.emit('sendToAdmin', data)
         socket.on("joinRoom", (room) => socket.join(room))
         io.to(room).emit('chat message', message)
   })
})



//Importing routes
const productsRoute = require("./routes/products")

app.use('/products', productsRoute)


server.listen(port, () => console.log(`App is listening on port ${port}`))