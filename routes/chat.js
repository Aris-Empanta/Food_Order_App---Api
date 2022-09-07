const express = require("express")
const router = express.Router()
const db = require('../database/db')
const controler = require("../controlers/chatController")


// The route to get all messages and sender's name from the database
router.get('/', controler.getMessages)

// The route to get all customers' names
router.get('/customers', controler.getCustomersNames)

// The route to get the amount of all the unread messages
router.get('/unread-messages', controler.getUnread)

// The route to save messages and sender's name in the database
router.post('/', controler.saveMessage)

module.exports = router