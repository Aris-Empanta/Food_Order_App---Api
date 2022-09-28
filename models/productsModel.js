//All the mySql queries to be used for products
module.exports = {
    getProducts: (sql, callback) => {

        let query = "SELECT * FROM Products"

        sql.query( query, callback)
    },
    getCategories : (sql, callback) => {

        let query = "SELECT * FROM Products GROUP BY Category"

        sql.query( query, callback)
    },
    getByCategory : (sql, category, callback) => {

        let query = "SELECT * FROM Products WHERE Category = " + sql.escape(category)

        sql.query( query, callback)
    },
    getById : (sql, id, callback) => {

        let query = "SELECT * FROM Products WHERE ID = " + sql.escape(id)

        sql.query( query, callback)
    },
    addProduct : (sql, array, callback) => {

        let query = `INSERT INTO Products VALUES 
                     (?, ?, ?, ?, ?, ?,  ?, ?)`

        sql.query( query, array, callback)
    },
    deleteOldImage : (sql, id,  callback) => {

        let query = `SELECT * FROM Products WHERE ID=${id}`

        sql.query( query, callback)
    },
    updateImage : ( sql, array, callback) => {

        let query = `UPDATE products SET Date = ?, 
                                        Image_name = ?                                              
                                        WHERE ID = ?`

        sql.query( query, array, callback)
    },
    editProduct : (sql, attributes, callback) => {

        let query = `UPDATE products SET Date = ?,
                                     Name = ?,
                                     Price = ?,
                                     Currency = ?,
                                     Description = ?                            
                                 WHERE id = ?`

        sql.query( query, attributes, callback)
    },
    deleteProductImage : (sql, id, callback) => {

        let query = `SELECT * FROM products WHERE ID=${id}`

        sql.query( query, callback)
    },
    deleteProduct : (sql, id, callback) => {

        let query = `DELETE FROM products WHERE ID = ${id}`

        sql.query( query, callback)
    }
}