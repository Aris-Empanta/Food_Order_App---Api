//All the mySql queries to be used for chat section
module.exports = {
    getMessages : ( sql, callback ) => {

                    let query = `SELECT * FROM chat_messages `

                    sql.query( query, callback )
                },
    getCustomersNames : ( sql, callback ) => {
                    
                    let query = `SELECT Sender, SUM(Read_status = 'unread') as Sum 
                                 FROM chat_messages GROUP BY Customer`

                    sql.query( query, callback )
                },
    getUnread : ( sql, callback ) => {
                    
                   let query = `SELECT SUM(Read_status = 'unread') as Unread
                                FROM chat_messages`

                   sql.query( query, callback)
               },
    saveAsRead : ( sql, attributes) => {

                  let query = `INSERT INTO chat_messages VALUES (?,?,?,?)`

                  sql.query( query, attributes )
              },
    saveAsUnread : ( sql, attributes) => {
                    
                  let query = `INSERT INTO chat_messages VALUES (?,?,?,?)`

                  sql.query( query, attributes )
             },
}