//All the mySql queries to be used for chat section
module.exports = {
    onlyCustomersMessages: (sql, callback) => {

                    let query = `SELECT Sender as customerName, 
                                        dateReceived,
                                        Read_status as checkedStatus 
                                 FROM chat_messages
                                 WHERE Sender <> 'admin'`

                    sql.query( query, callback )
    },
    getMessages: ( sql, callback ) => {

                    let query = `SELECT * FROM chat_messages`

                    sql.query( query, callback )
                },
                
    getCustomersNames: ( sql, callback ) => {
                    
                    let query = `SELECT Customer, 
                                        MAX(dateReceived) as dateReceived, 
                                        SUM(Read_status = 'unread') as Sum 
                                 FROM chat_messages                                 
                                 GROUP BY Customer                            
                                 ORDER BY dateReceived DESC` 

                    sql.query( query, callback )
                },
    getLatestMessage: ( sql, callback ) => {

                    let query = `SELECT Customer, 
                                        Message, 
                                        MAX(dateReceived) as dateReceived                                
                                    FROM chat_messages
                                    GROUP BY Customer`

                    sql.query( query, callback )
                },
    getUnread: ( sql, callback ) => {
                    
                   let query = `SELECT SUM(Read_status = 'unread') as Unread
                                FROM chat_messages`

                   sql.query( query, callback)
               },
    saveAsRead: ( sql, attributes) => {

                  let query = `INSERT INTO chat_messages 
                               VALUES (?,?,?,?)`

                  sql.query( query, attributes )
              },
    saveAsUnread: ( sql, attributes) => { 
                    
                  let query = `INSERT INTO chat_messages 
                               VALUES (?,?,?,?)`

                  sql.query( query, attributes )
             },
    deleteConversation: (sql, customer, callback) => {

                let query = `DELETE FROM chat_messages WHERE Customer = ?`

                sql.query( query, customer, callback )
            },
    markAsUnread: (sql, customer, callback) => {

        let query = `UPDATE chat_messages SET Read_status = 'unRead'                       
                                          WHERE Sender = ? `
                            
        sql.query( query, customer, callback )
    }   
}