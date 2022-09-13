module.exports = {
    latestOrderId: (sql, callback) => {

        let query = "SELECT MAX(orderId) as latestId FROM orders"

        sql.query(query, callback)
    },
    saveNewOrder: (sql, data) => {

        let query = `INSERT INTO orders VALUES 
                     (?, ?, ?, ?, ?, ?, ?, ?, ?)`

        sql.query(query, data)
    },
    ordersById: (sql, callback) => {

        let query = `SELECT * FROM orders 
                     GROUP BY orderId
                     ORDER BY orderId DESC`

        sql.query(query, callback)
    },
    getUnchecked: (sql, callback) => {

        let query = `SELECT * FROM orders 
                     WHERE checkedStatus = 'unChecked'
                     GROUP BY orderId `   
                     

        sql.query(query, callback)
    },
    getSpecificOrder: (sql, id,  callback) => {

        let query = `SELECT * FROM orders
                     WHERE orderId = ${id}`           

        sql.query(query, callback)
    },
    getTotalPrice: (sql, id,  callback) => {

        let query = `SELECT SUM(price) as totalPrice FROM orders
                     WHERE orderId = ${id}`           

        sql.query(query, callback)
    }
}