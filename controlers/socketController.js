const axios = require('axios');
const model = require('../models/socketModel')

module.exports = {
    saveMessage: (db, name, sender, message) => {
                                                 if( sender === 'admin' ) {                   

                                                    let messageDetails = [name, sender, message, 'read']
                                                    
                                                    model.saveMessage(db, messageDetails)
                                                 } else {

                                                    let messageDetails = [name, sender, message, 'unread']
                                                    
                                                    model.saveMessage(db, messageDetails)
                                                 } 
                                                },
    markAsRead: (db, sender) => model.markAsRead(db, sender) ,
    markAsChecked: (db, id) => model.markAsChecked(db, id), 
    manageOrders: (data, io) => {
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

                                                      //We send the order's details to the database
                                                      axios.post("http://localhost:5000/orders/new-order", finalOrder)
                                                           .catch(err => console.log(err))
                                                      //Send the order to the admin in real-time as push notification
                                                      io.emit('new order')                                
                                                      })
                                       .catch(err => console.log(err))
                                }
}