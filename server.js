const express = require("express")
const app = express()
const port = process.env.PORT || 5000
const cors = require("cors")

//The middlewares needed to exchange data with frontend.
app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json())

//Importing routes
const productsRoute = require("./routes/products")

app.use('/products', productsRoute)


app.listen(port, () => console.log(`App is listening on port ${port}`))