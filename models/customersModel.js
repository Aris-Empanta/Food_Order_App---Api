//All the mySql queries to be used for customer section
module.exports = {
    getCustomersInfo: (sql, callback) => {

        let query = `SELECT * 
                     FROM customers`

        sql.query( query, callback)
    },
    getCustomerByEmail: (sql, email, callback) => {

        let query = `SELECT * 
                     FROM customers 
                     WHERE Email = ?`

        sql.query( query, email, callback)
    }
}