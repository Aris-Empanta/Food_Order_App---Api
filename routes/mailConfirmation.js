const express = require("express")
const router = express.Router()
const nodemailer = require("nodemailer")
const dotenv = require('dotenv').config()

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
      }, (err) => { if(err) console.log(err)
                    console.log("success")})       
})

module.exports = router;