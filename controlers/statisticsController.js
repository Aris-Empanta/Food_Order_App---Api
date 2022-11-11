const db = require('../database/db')
const model = require("../models/statisticsModel")
const currentDate = require("../functions/functions").onlyDate
const daysAgo = require("../functions/functions").daysAgo
const getDayName = require("../functions/functions").getDayName
const axios = require("axios")

module.exports = {
    dailyIncome: (req, res) => {

        //With that function, we will loop throught the data received from database,
        //separate and add today's orders prices to get the daily income.
        const getDailyIncome = (err, rows) => {

            if(err) {
                return console.log(err)
            }

            let today = currentDate()
            let dailyOrders = rows.filter( item => { 
                                                     let onlyDateFormat = item.date.split(" ")[0]
                                                     return onlyDateFormat === today
                                                    })
            let dailyIncome = dailyOrders.map(item => item.totalPrice)
                                         .reduce((previous, current) => previous + current, 0)
           
            res.send({ dailyIncome: dailyIncome,
                       currency: rows[0].currency })
        }
        //We send the daily income to the requesting parties
        model.dailyIncome(db, getDailyIncome ) 
    }, 
    weeklyIncome: (req, res) => {

        //Below function returns an array with the revenue for each of
        //the last 7 days.
        const incomePerWeekDays = (err, rows) => {

                    let revenueByDay = []

                    rows.map( item => item.date = item.date.split(" ")[0])
                    
                    //We loop throught the last 7 days, we estimate the total revenue for each 
                    //day, and we create an array containing daily revenue and date.
                    for(let i=0; i < 7; i++) {

                        let day = daysAgo(i)
                        let todaysOrders = rows.filter( item => item.date === day)
                                            .map( item => item.totalPrice)
                                            .reduce( (previous, current) => previous + current, 0) 

                        
                        let dateName = getDayName(day)

                        revenueByDay.push({
                                            revenue: todaysOrders,
                                            day: dateName
                                        })
                    }            
                        
            res.send(revenueByDay)
        }

        model.weeklyIncome(db, incomePerWeekDays ) 
    }, 
    totalOrders: (req, res) => {

        model.totalOrders(db, (err, rows) => {

            res.send({ ordersAmount: rows.length })
        })
    },
    totalCustomers: (req, res) => {

        model.totalCustomers(db, (err, rows) => {

            res.send({ customersAmount: rows.length })
        })
    },
    totalRevenue: (req, res) => {

        const totalRevenue = (err, rows) => {
                                              let revenue = rows.map( item => item.totalPrice )
                                                                .reduce( (previous, current) => previous + current,0)  
                                              let currency = rows[0].currency
                                               
                                              res.send({ revenue: revenue,
                                                         currency: currency }) 
                                            }

        model.totalRevenue(db, totalRevenue)
    },
    trendingOrders: (req, res) => {

        model.trendingOrders(db, (err, rows) => {

            //Getting the five most popular dishes
            let fiveMostPopular = rows.slice(0, 4)

            res.send(fiveMostPopular)
        })
    }
}