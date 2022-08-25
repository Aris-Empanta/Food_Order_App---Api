const express = require("express")
const router = express.Router()
const db = require('../database/db')


//------> Fetching all messages and sender's name from the database <------
router.get('/', (req, res) => {
    db.query(`SELECT * FROM chat_messages `, (err, rows) => {
              res.send(rows)
          })
})

//------> With below endpoint 'unread' marked messages change to 'read'  <------
router.put('/', (req, res) => {
    let sender = req.body.sender

    db.query("UPDATE chat_messages SET Read_status = 'read' WHERE Sender=" + db.escape(sender))
})

//------> Fetching all customer's name <------
router.get('/customers', (req, res) => {

    db.query("SELECT Sender, SUM(Read_status = 'unread') as Sum FROM chat_messages GROUP BY Customer",
             (err, rows) =>  res.send(rows)
            )
})

//------> Fetching the amount of all the unread messages <------
router.get('/unread-messages', (req, res) => {
    db.query(`SELECT SUM(Read_status = 'unread') as Unread FROM chat_messages`, 
             (err, rows) => {
                res.send(rows)
            })
})

//------> Inserting messages and sender's name to the database. <------
router.post('/', (req, res) => {
      
    let customer = req.body.username
    let sender = req.body.sender
    let message = req.body.message

    /* Setting below condition so that admin's messages are not marked 
      as unread to the admin's inbox*/
    if( sender === 'admin' ) {

        db.query(`INSERT INTO chat_messages VALUES (?,?,?,?)`,
                  [customer, sender, message, 'read'])
    } else {

        db.query(`INSERT INTO chat_messages VALUES (?,?,?,?)`, 
                  [customer, sender, message, 'unread'])
    }
    
})

module.exports = router