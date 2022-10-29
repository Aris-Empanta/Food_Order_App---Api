const db = require("../database/db")
const orders = require("../models/ordersModel") 
const chat = require("../models/chatModel")
const axios = require("axios")

module.exports = {
    getNotifications: (req, res) => {

        //The 2 endpoints whose data will be combined to create the notifications endpoint
        const chatData = axios.get('http://localhost:5000/chat-messages/only-customers')
        const ordersData = axios.get('http://localhost:5000/orders/')    
                          

        axios.all([chatData, ordersData])
             .then( response => {
                                //Below is the logic to combine the 2 data arrays and sort
                                //them by date. We add also data type for the front end. 
                                let messagesArray = response[0].data.map( item => {
                                                                                return { ...item, type: "message"}
                                                                                }
                                                                                )
                                let ordersArray = response[1].data.map( item => {
                                                                                return { ...item, type: "order"}
                                                                                }
                                                                            )

                                let notifications = messagesArray.concat(ordersArray)
                                                                .sort((first, second) => {

                                                    if (first.dateReceived > second.dateReceived) return -1;
                                                    if (first.dateReceived == second.dateReceived) return 0;
                                                    if (first.dateReceived < second.dateReceived) return 1; 
                                                })

                                res.send(notifications)                                 
                                }
                            );
    }
}