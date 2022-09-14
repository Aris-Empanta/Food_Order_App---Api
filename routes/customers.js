const express = require("express")
const router = express.Router()

router.post("/customers-info", (req, res) => console.log(req.body))

module.exports = router