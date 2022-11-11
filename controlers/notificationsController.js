const db = require("../database/db")
const model = require("../models/notificationsModel")
const sortByDate = require("../functions/functions").sortByDate

module.exports = {
    getNotifications: (req, res) => {
        
        const sendNotifications = (err, rows) => {

            //We add type key value pair
            rows.map( item => {

                item["type"] = item.checkedStatus === "read" || item.checkedStatus === "unread" ?
                                                                                      "message" : 
                                                                                      "order"
                return item  
            })

            //We sort the notifications by date
            sortByDate(rows)            

            res.send(rows)         
        }

        model.getNotifications(db, sendNotifications)
    }
}