module.exports = {
    saveMessage: (sql, messageDetails) => {

        let query = `INSERT INTO chat_messages VALUES (?,?,?,?)`

        sql.query(query, messageDetails)
    },
    markAsRead: (sql, sender) => {

        let query = "UPDATE chat_messages SET Read_status = 'read' WHERE Sender="
                    + sql.escape(sender)

        sql.query(query)
    },
    markAsChecked: (sql, id) => {

        let query = "UPDATE orders SET checkedStatus = 'checked' WHERE orderId="
                    + sql.escape(id)

        sql.query(query)
    }, 
    saveCustomerData: (sql, data, callback) => {

        let query = `INSERT INTO customers VALUES (?,?,?,?,?)`

        sql.query(query, data, callback)
    }
}