const express = require("express")
const router = express.Router()
const controller = require("../controlers/statisticsController")

//The total daily income
router.get("/daily-income", controller.dailyIncome)

//An array with the daily income of the last 7 days
router.get("/weekly-income", controller.weeklyIncome)

//The total amount of orders
router.get("/total-orders-amount", controller.totalOrders)

//The total amount of customers
router.get("/total-customers-amount", controller.totalCustomers)

//The total income so far
router.get("/total-revenue", controller.totalRevenue)

//The 5 most popular orders
router.get("/trending-orders", controller.trendingOrders)

module.exports = router