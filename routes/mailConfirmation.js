const express = require("express")
const router = express.Router()
const mail = require("nodemailer")

router.post("/", (req, res) => {

    let mail = req.body.mail

    console.log(mail)
})

module.exports = router;