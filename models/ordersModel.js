module.exports = {
    latestOrderId: (sql, callback) => {

        let query = "SELECT MAX(orderId) as latestId FROM orders"

        sql.query(query, callback)
    },
    saveNewOrder: (sql, data) => {

        let query = `INSERT INTO orders VALUES 
                     (?, ?, ?, ?, ?, ?, ?, ?)`

        sql.query(query, data)
    }
}