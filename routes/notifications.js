const express = require("express")
const router = express.Router()
const controller = require("../controlers/notificationsController")

//The route to get all notifications - messages and orders - 
//sorted by date in descending order
router.get("/customers-info", controller.getNotifications )

module.exports = router