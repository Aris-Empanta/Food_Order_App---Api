const db = require('../database/db')
const controler = require("../controlers/socketController")
const currentDate = require("../functions/functions").currentDate

module.exports = (io) => {  io.sockets.on('connection', (socket) => {   
                              
                              /*When server receives a message from a customer or admin, 
                                we dynamically create an event depending on customer's name, 
                                and emit it with the message to both parties.  */
                              socket.on('chat message', (data) => {
                          
                                    let name = data.username
                                    let sender = data.sender
                                    let message = data.message 
                                    let date = currentDate()
                          
                                    //Sending the real time message to the appropriate sender and receive
                                    io.emit('customer ' + name, { message: message,
                                                                  sender: sender,
                                                                  date: date})
                                        
                                    io.emit('new message')
                          
                                    /* Saving transferred messages to the database. Also setting the condition that 
                                      admin's messages are not marked as unread to the admin's inbox*/
                                    controler.saveMessage(db, name, sender, message, date)        
                              }) 
                              
                              //Once admin private chat is open, no received message can have unread status
                              socket.on('inbox zero', (sender) => controler.markAsRead(db, sender))                                                                                  
                          
                              //Updates the unread message indicator on navbar 
                              socket.on('update navbar', () => io.emit('re-evaluate unread'))   

                              //Updates the unchecked order indicator on navbar
                              socket.on("order checked", () => io.emit("re-evaluate orders")) 

                              //We change the checkedStatus of an order with specific id to checked
                              socket.on('mark order checked', (id) => controler.markAsChecked(db, id))
                              
                              //When we click on a conversation in chat dashboard with a customer, 
                              //it makes unread messages with him 0. 
                              socket.on('message read', (sender) => controler.markAsRead(db, sender))
                            
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
                                                                try {
                                                                  controler.manageOrders(data, io)
                                                                } catch (e) {
                                                                  console.log(e)
                                                                }
                                                                  
                                                                }) 
                              //On customer data received
                              socket.on('customer data', (data) => { 
                                                                    controler.saveCustomerData(db, data)
                                                                   }
                                                                 )   
                          })
                        }