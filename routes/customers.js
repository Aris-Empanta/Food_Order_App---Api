const express = require("express")
const router = express.Router()
const controller = require("../controlers/customersController")

router.get("/customers-info", controller.getCustomersInfo )

router.get("/customer-by-:email", controller.getCustomerByEmail )

 
module.exports = router