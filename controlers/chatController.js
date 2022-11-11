const db = require('../database/db')
const model = require("../models/chatModel")
const sortByDate = require("../functions/functions").sortByDate

//All the controllers for the chat section's CRUD operation
module.exports = {
    onlyCustomersMessages: (req, res) => {

        const sendData = (err, rows) => {
                                            //We sort the messages in descending date order
                                            sortByDate(rows)  
                                            res.send(rows)
                                        }

        model.onlyCustomersMessages(db, sendData )
    },
    getMessages : (req, res) => {
        
        const sendData  = (err, rows) => {

            //We sort the messages in descending date order
            sortByDate(rows)                                          
            //We send the messages in ascending date order
            res.send(rows.reverse())
          }

        model.getMessages( db, sendData )        
    },
    getCustomersNames : (req, res) => {

        const sendData  = (err, rows) => {

            //We sort the messages in descending date order
            sortByDate(rows)                                 
            res.send(rows)
          }
 
        model.getCustomersNames( db, sendData )       
    },
    getLatestMessage: (req, res) => { 
        
        const sendData = (err, rows) => {
            //We sort the messages in descending date order
            sortByDate(rows)  
            res.send(rows)
        }

        model.getLatestMessage(db, sendData)
    },
    getUnread : (req, res) => {

        model.getUnread( db,  (err, rows) => {
                                                res.send(rows)
                                             })        
    },
    saveMessage : (req, res) => {
      
        let customer = req.body.username
        let sender = req.body.sender
        let message = req.body.message
                   
        /* Setting below condition so that admin's messages are not marked 
          as unread to the admin's inbox*/
        if( sender === 'admin' ) {

            let savedAsRead = [customer, sender, message, 'read']
            
            model.saveAsRead( db, savedAsRead )                     
        } else {
            
            let savedAsUnread = [customer, sender, message, 'unread']

            model.saveAsUnread( db, savedAsUnread )            
        }
        
    },
    deleteConversation: (req, res) => {

        let customer = req.params.customer

        model.deleteConversation(db, customer, (err, rows) => { if (err) throw err;  })
    },
    markAsUnread: (req, res) => {

        let customers = req.body.customers

        for(let customer of customers) {

            model.markAsUnread(db, customer, (err, rows) => { if (err) throw err;  })
        }
    },
    deleteSelected: (req, res) => {

        //We convert the received parameters payload to an array so that
        //we can iterate to delete each customer's conversation.
        let customers = req.params.customer.split('-')

        
        for(let customer of customers) {

            model.deleteConversation(db, customer, (err, rows) => { if (err) throw err;  })
        }
    }
}