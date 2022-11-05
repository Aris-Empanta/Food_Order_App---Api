module.exports = {
    dailyIncome: (sql, callback) => {        

        //We query only the columns needed to calculate the today's 
        //income.
        let query = `SELECT orderId, totalPrice, date
                     FROM orders
                     GROUP BY orderId`

        sql.query(query, callback) 
    },
    weeklyIncome: (sql, callback) => {
        
        let query = `SELECT orderId, totalPrice, date
                     FROM orders
                     GROUP BY orderId`

        sql.query(query, callback) 
    },
    totalRevenue: (sql, callback) => {
        
        let query = `SELECT orderId, totalPrice, date, currency
                     FROM orders
                     GROUP BY orderId`

        sql.query(query, callback) 
    },
    trendingOrders: (sql, callback) => {
        
        let query = `SELECT productName, COUNT(productName) as amount, 
                            imageName, unitPrice, currency
                     FROM orders
                     GROUP BY productName
                     ORDER BY amount DESC
                     `

        sql.query(query, callback) 
    },
}