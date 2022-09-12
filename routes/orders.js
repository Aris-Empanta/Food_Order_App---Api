const express = require("express")
const router = express.Router()
const controler = require("../controlers/ordersController")

//The route to get the id of the latest order made
router.get("/latest-order-id", controler.latestOrderId)

//The route to get the orders group by id
router.get("/orders-by-id", controler.ordersById)

//The route to post a new order made to the database
router.post("/new-order", controler.saveNewOrder )

// The route to get the amount of all the unchecked orders
router.get('/unchecked-orders', controler.getUnchecked)

module.exports = router