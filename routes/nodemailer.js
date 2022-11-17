const express = require("express")
const router = express.Router()
const nodemailer = require("nodemailer")


//The route that a customer uses to send a mail to admin
router.post("/customer-form", (req, res) => {

  let name = req.body.name.toUpperCase()
  let email = req.body.email
  let phone = req.body.phone
  let comments = req.body.comments

  let transporter = nodemailer.createTransport({
     host: process.env.MAIL_HOST,
     port: 465,
     secure: true, 
     auth: {
      user: process.env.USER_MAIL, 
      pass: process.env.USER_PASS, 
    },
  })

  transporter.sendMail({
      from: process.env.USER_MAIL,
      to: "eams220891@gmail.com", 
      subject: "EMAIL FROM CUSTOMER NAMED " + name, 
      html: `Customer's contact Info <br>
             &nbsp;&nbsp; <b>email</b>: ${ email } <br>
             &nbsp;&nbsp; <b>phone number</b>: ${ phone } <br>           
             &nbsp;&nbsp; <b>Message</b>: ${comments} <br>`     
    }, (err) => { if(err) {
                         res.send(err)
                    }
                  else{
                      res.send("Your message has been successfully sent!")
                  }
    })    
})

module.exports = router;