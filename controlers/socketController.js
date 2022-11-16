const axios = require('axios');
const model = require('../models/socketModel')
const functions = require("../functions/functions")
const serverHost = require("../variables/variables").serverHost

module.exports = {
    saveMessage: (db, name, sender, message, date) => {

                                                 if( sender === 'admin' ) {                   

                                                    let messageDetails = [name, sender, message, 'read', date]
                                                    
                                                    model.saveMessage(db, messageDetails)
                                                 } else {

                                                    let messageDetails = [name, sender, message, 'unread', date]
                                                    
                                                    model.saveMessage(db, messageDetails)
                                                 } 
                                                },
    markAsRead: (db, sender) => model.markAsRead(db, sender) ,
    markAsChecked: (db, id) => model.markAsChecked(db, id), 
    manageOrders: (data, io) => {                                 
                                 axios.get(serverHost + "orders/latest-order-id")
                                      .then((res) => {
                                                      const latestId = res.data.latestId
                                                      let newId
                                                      
                                                      newId = latestId + 1

                                                      //The complete order data to be sent to the database
                                                      let finalOrder = data.map( item => {
                                                                                        item["orderId"] = newId

                                                                                        return item
                                                                                        })

                                                      //We send the order's details to the database
                                                      axios.post(serverHost + "orders/new-order", finalOrder)
                                                           //Send the order to the admin in real-time as push notification
                                                           .then( io.emit('new order'))
                                                           .catch(err => console.log(err))                               
                                                                                       
                                                      })
                                       .catch(err => console.log(err))
                                },
      saveCustomerData: (db, data) => {
                                       let date = functions.currentDate()

                                       let customerData = [ data.name, data.address,
                                                            data.floor, data.phone,
                                                            data.email, date ]
                                       
                                       model.saveCustomerData(db, customerData, (err, rows) => { if(err) console.log(err) })                                       
                                  }
} 