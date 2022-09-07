//All the mysql queries to be used for products
module.exports = {
    get: (sql, callback) => {

        sql.query("SELECT * FROM Products", callback)
    },
    getCategories : (sql, callback) => {

        sql.query("SELECT * FROM Products GROUP BY Category", callback)
    },
    getByCategory : (sql, category, callback) => {

        sql.query("SELECT * FROM Products WHERE Category = " + sql.escape(category), callback)
    },
    getById : (sql, id, callback) => {

        sql.query("SELECT * FROM Products WHERE ID = " + sql.escape(id), callback)
    }
}