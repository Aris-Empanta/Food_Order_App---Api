const db = require('../database/db')
const controler = require("../controlers/socketController")
const axios = require('axios')

module.exports = (io) => {  io.sockets.on('connection', (socket) => {   
                              
                              /*When server receives a message from a customer or admin, 
                                we dynamically create an event depending on customer's name, 
                                and emit it with the message to both parties.  */
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
                                    controler.saveMessage(db, name, sender, message)        
                              }) 
                              
                              //Once admin private chat is open, no received message can have unread status
                              socket.on('inbox zero', (sender) => controler.markAsRead(db, sender))
                              
                              //Real time order sending from customer's app to admin dashboard
                              socket.on('send order', (data) =>  io.emit('new order', data) )                                                                
                          
                              //Updates the unread message indicator on navbar 
                              socket.on('update navbar', () => socket.emit('re-evaluate unread') )                           
                              
                              //When we click on a conversation in chat dashboard with a customer, 
                              //it makes unread messages with him 0.
                              socket.on('message read', (sender) => controler.readCustomersMessages(db, sender))
                            
                              //The 2 listeners below emit notication to the admin that a specific
                              // customer is typing a message.
                              socket.on('I type', (data) => io.emit(data + ' is typing') )
                            
                              socket.on('No typing', (data) => io.emit(data + " not typing") )
                            
                              //The 2 listeners below emit notication to a specific customer that
                              //admin is typing a message.
                              socket.on('Admin typing', (data) => io.emit('Admin typing to ' + data) )

                              socket.on('Admin not typing', (data) => io.emit('Admin not typing to ' + data) )
                            
                              //On new orders received
                              socket.on("send order", (data) => {
                                                      
                                                      axios.get("http://localhost:5000/orders/latest-order-id")
                                                            .then((res) => {
                                                                            const latestId = res.data.latestId
                                                                            let newId
                                                                            //Generates order id with maximum number 999
                                                                            latestId === null || latestId === 999 ? 
                                                                            newId = 1 :
                                                                            newId = latestId + 1

                                                                            //The complete order data to be sent to the database
                                                                            let finalOrder = data.map( item => {
                                                                                                                 item["orderId"] = newId

                                                                                                                 return item
                                                                                                                })
                                                                            //We send the data to the database
                                                                            axios.post("http://localhost:5000/orders/new-order", finalOrder)
                                                                                 .catch(err => console.log(err))                                                                   


                                                                          }).catch(err => console.log(err))                      
                                                    })
                          })
                        }