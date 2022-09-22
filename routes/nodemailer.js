const express = require("express")
const router = express.Router()
const nodemailer = require("nodemailer")

//  ATTENTION! Outlook and most free domains have limitation to the
//emails you can send per minute/hour. If it were for real business
//purposes, we should use a paied domain.

//The route to send verification code to the customer
router.post("/", (req, res) => {

    let mail = req.body.mail
    //Nodemailer accept only string in its configurations
    let verificationCode = String(req.body.verificationCode)

    let transporter = nodemailer.createTransport({
      service: 'outlook',
      auth: {
        user: process.env.ADMIN_MAIL,
        pass: process.env.ADMIN_PASSWORD
      }
    })

    transporter.sendMail({
        from: process.env.ADMIN_MAIL ,
        to: mail, 
        subject: "YOUR EMAIL VERIFICATION", 
        text: verificationCode,      
      }, (err) => { if(err) console.log(err)})       
})

//The route to send an email to the customer to inform him for order status



module.exports = router;