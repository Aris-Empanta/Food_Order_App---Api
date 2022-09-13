const express = require("express")
const router = express.Router()
const controler = require("../controlers/ordersController")

//The route to get the id of the latest order made
router.get("/latest-order-id", controler.latestOrderId)

//The route to get the orders group by id
router.get("/orders-by-id", controler.ordersById)

//The route to get an order with a specific id
router.get("/order-with-id-:id", controler.getSpecificOrder)

//The route to get the total price of an order with a specific id
router.get("/price-of-:id", controler.getTotalPrice)

//The route to post a new order made to the database
router.post("/new-order", controler.saveNewOrder )

// The route to get the amount of all the unchecked orders
router.get('/unchecked-orders', controler.getUnchecked)

module.exports = router