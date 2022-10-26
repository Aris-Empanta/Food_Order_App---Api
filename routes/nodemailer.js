const express = require("express")
const router = express.Router()
const nodemailer = require("nodemailer")

//  ATTENTION! Outlook and most free domains have limitation to the
//emails you can send per minute/hour. If it were for real business
//purposes, we should use a paied domain.

//The route to send verification code to the customer
router.post("/confirm", (req, res) => {

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
        text: verificationCode + "\n\n This code will be active for the next five minutes.",      
      }, (err) => { if(err) console.log(err)})       
})


//The route that a customer uses to send a mail to admin
router.post("/customer-form", (req, res) => {

  let name = req.body.name.toUpperCase()
  let email = req.body.email
  let phone = req.body.phone
  let comments = req.body.comments

  let transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
      user: process.env.ADMIN_MAIL,
      pass: process.env.ADMIN_PASSWORD
    }
  })

  transporter.sendMail({
      from: process.env.ADMIN_MAIL ,
      to: "eams220891@gmail.com", 
      subject: "EMAIL FROM CUSTOMER NAMED " + name, 
      text: `Customer's contact Info 
                email: ${ email }
                phone number: ${ phone }             
             
             Hello,             
             ${comments}`     
    }, (err) => { if(err) console.log(err)})    
})



module.exports = router;