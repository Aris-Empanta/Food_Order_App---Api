module.exports = {
    distinctOrders: (sql, callback) => {

        let query = `SELECT customerName, 
                            date as dateReceived,
                            checkedStatus 
                     FROM orders
                     GROUP BY orderId
                     ORDER BY dateReceived DESC`

        sql.query(query, callback)
    },
    latestOrderId: (sql, callback) => {

        let query = "SELECT MAX(orderId) as latestId FROM orders"

        sql.query(query, callback)
    },
    latestCustomerOrder: (sql, mail, callback) => {

        let query = `SELECT MAX(invoice) as invoice
                     FROM orders                    
                     WHERE customerMail = ?`

        sql.query(query, mail, callback)
    },
    saveNewOrder: (sql, data, callback) => {

        let query = `INSERT INTO orders VALUES 
                     (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ? ,? ,?, ?)`  

        sql.query(query, data, callback)
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