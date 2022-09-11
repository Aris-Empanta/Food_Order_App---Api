const express = require("express")
const router = express.Router()
const controler = require("../controlers/ordersController")

router.get("/latest-order-id", controler.latestOrderId)

router.post("/new-order", controler.saveNewOrder )

module.exports = router