const db = require('../database/db')
const model = require("../models/customersModel")

module.exports = {
    getCustomersInfo: (req, res) => {

        model.getCustomersInfo(db, (err, rows) => res.send(rows))
    },
    getCustomerByEmail: (req, res) => {

        let email = req.params.email

        model.getCustomerByEmail(db, email, (err, rows) => res.send(rows[0]))
    }
}
