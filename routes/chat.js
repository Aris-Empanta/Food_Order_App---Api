const express = require("express")
const router = express.Router()
const controler = require("../controlers/chatController")

// The route to get all messages and sender's name from the database 
//sorted by date descending
router.get('/', controler.getMessages)

// The route to get all messages and sender's name from the database 
//sorted by date ascending

// The route to get all customers' names
router.get('/customers', controler.getCustomersNames)

// The route to get the amount of all the unread messages
router.get('/unread-messages', controler.getUnread) 

//The route to get the latest each customer's message and the date receiver
router.get('/latest-message', controler.getLatestMessage)

// The route to save messages and sender's name in the database
router.post('/', controler.saveMessage)

//The route to mark a message/messages as unread
router.put('/mark-as-unread', controler.markAsUnread)

//The route to delete a conversation with a customer
router.delete('/delete-conversation/:customer', controler.deleteConversation)

//The route to delete all selected conversations
router.delete('/delete-selected/:customer', controler.deleteSelected)

module.exports = router