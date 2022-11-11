module.exports = {
    getNotifications: (sql, callback) => {

        let query = `SELECT Sender as customerName, 
                            dateReceived,
                            Read_status as checkedStatus 
                     FROM chat_messages
                     WHERE Sender <> 'admin'
                     UNION
                     SELECT customerName, 
                            date as dateReceived,
                            checkedStatus 
                     FROM orders
                     GROUP BY orderId`

        sql.query( query, callback )
}
}