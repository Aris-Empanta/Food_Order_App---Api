
module.exports = {
    saveMessage: (db, name, sender, message) => {
                                                 if( sender === 'admin' ) {
                                                                
                                                    db.query(`INSERT INTO chat_messages VALUES (?,?,?,?)`,
                                                            [name, sender, message, 'read'])
                                                 } else {

                                                    db.query(`INSERT INTO chat_messages VALUES (?,?,?,?)`, 
                                                            [name, sender, message, 'unread'])
                                                 } 
                                                },
    markAsRead: (db, sender) => {
                                    
                                 db.query("UPDATE chat_messages SET Read_status = 'read' WHERE Sender="
                                           + db.escape(sender))
                                },
    readCustomersMessages: (db, sender) => {
                                            db.query("UPDATE chat_messages SET Read_status = 'read' WHERE Sender="
                                                      + db.escape(sender))
                                            }
}