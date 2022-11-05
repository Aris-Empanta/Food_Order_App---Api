const express = require("express")
const router = express.Router()
const controller = require("../controlers/statisticsController")

router.get("/daily-income", controller.dailyIncome)

router.get("/weekly-income", controller.weeklyIncome)

router.get("/total-revenue", controller.totalRevenue)
 
router.get("/trending-orders", controller.trendingOrders)

module.exports = router