//All the mySql queries to be used for chat section
module.exports = {
    getMessages: ( sql, callback ) => {

                    let query = `SELECT * FROM chat_messages 
                                 ORDER BY dateReceived`

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
                                        dateReceived    
                                 FROM chat_messages
                                 WHERE dateReceived in (
                                    SELECT MAX(dateReceived)
                                    FROM chat_messages
                                    GROUP BY Customer                                    
                                 )  
                                 ORDER BY dateReceived DESC                           
                                 `

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