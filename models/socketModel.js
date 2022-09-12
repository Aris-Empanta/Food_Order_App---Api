module.exports = {
    saveMessage: (sql, messageDetails) => {

        let query = `INSERT INTO chat_messages VALUES (?,?,?,?)`

        sql.query(query, messageDetails)
    },
    markAsRead: (sql, sender) => {

        let query = "UPDATE chat_messages SET Read_status = 'read' WHERE Sender="
                    + sql.escape(sender)

        sql.query(query)
    }
}