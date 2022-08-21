const express = require("express")
const app = express()
//Creating a new server for socket.io with express
const http = require('http')
//We create an http server
const server = http.createServer(app)
const { Server } = require('socket.io')
//The socket.io server instance attached to an instance of http.Server.
const io = new Server(server, {
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

/*With the ".on", the io server or the client object can listen for events. 
 The first argument is the event. The second is the event handler.
 The argument socket represents the client object.*/
io.on('connection', (socket) => {
    io.emit('message', 'hello user')

    socket.on("chat message", (msg) => {
        io.emit("chat message", msg)
    })
})

//Importing routes
const productsRoute = require("./routes/products")
const { Socket } = require("dgram")

app.use('/products', productsRoute)


server.listen(port, () => console.log(`App is listening on port ${port}`))