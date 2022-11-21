
## Food Order App - Server

&nbsp;&nbsp;&nbsp;&nbsp;This is the server used by the 
[Food order app](https://courageous-frangipane-c90c9e.netlify.app/) and its
[Admin Dashboard](https://6378372e9d407f764d34917b--subtle-nasturtium-5d32c7.netlify.app/).
It contains all the backend logic needed for them.

## Index

&nbsp;&nbsp;&nbsp;&nbsp;[Intro](#intro)\
&nbsp;&nbsp;&nbsp;&nbsp;[Technologies](#technologies)\
&nbsp;&nbsp;&nbsp;&nbsp;[Server Host](#server-host)\
&nbsp;&nbsp;&nbsp;&nbsp;[Routes](#routes)\
&nbsp;&nbsp;&nbsp;&nbsp;[MVC pattern](#mvc-pattern)\
&nbsp;&nbsp;&nbsp;&nbsp;[Socket.io](socket-io)

## Intro
&nbsp;&nbsp;&nbsp;&nbsp;A monolithic Node js server built in MVC architectural pattern 
. It is connected
to an online MySql database, which holds all the data for the 2 apps mentioned above needed. 

## Technologies

The main technologies used for this app are the following **:**
- Node.js
- Express
- MySql
- Socket.io

## Server Host

&nbsp;&nbsp;&nbsp;&nbsp;This app is deployed on a Shared Hosting service. The url 
of the host is held in [variable](https://github.com/Aris-Empanta/Food_Order_App---Server/blob/main/variables/variables.js)
 and is used in several different files. So if we need to change host, we
 just have to change the value of this variable!

## Routes
&nbsp;&nbsp;&nbsp;&nbsp;In order to make an HTTP request,
you have to combine the server's host url (
https://restaurant-server.arisdb.myipservers.gr/ ), with one of the paths
mentioned below, depending the task you want to carry out.\
&nbsp;&nbsp;&nbsp;&nbsp;Due to the large amount of different routes, I separated them in 7 different
categories using the **express.Router()** method.

### Quick links

&nbsp;&nbsp;&nbsp;&nbsp;[Products](#products)\
&nbsp;&nbsp;&nbsp;&nbsp;[Chat](#chat)\
&nbsp;&nbsp;&nbsp;&nbsp;[Customers](#customers)\
&nbsp;&nbsp;&nbsp;&nbsp;[Orders](#orders)\
&nbsp;&nbsp;&nbsp;&nbsp;[NodeMailer](#nodemailer)\
&nbsp;&nbsp;&nbsp;&nbsp;[Notifications](#notifications)\
&nbsp;&nbsp;&nbsp;&nbsp;[Statistics](#statistics)

### Products

- **GET** [/products](https://restaurant-server.arisdb.myipservers.gr/products) **:** Gets all products with their characteristics.

- **GET** [/products/categories](https://restaurant-server.arisdb.myipservers.gr/products/categories) **:** Gets all different products categories name.

- **GET** [/products/categories-with-image](https://restaurant-server.arisdb.myipservers.gr/products/categories-with-image) **:** Gets all different products categories name,and the url that links to the image of the first product belonging to the category name.

- **GET** [/products/by-category/:category](https://restaurant-server.arisdb.myipservers.gr/products/by-category/pizza ) **:** Gets the products of the category mentioned in params.

- **GET** [/products/by-id/:id](https://restaurant-server.arisdb.myipservers.gr/products/by-id/1)  **:** Gets the product with the same id in route's params. 

- **POST** [/products/add/:id](https://restaurant-server.arisdb.myipservers.gr/) **:** The client can add a product with all its characteristics, and a unique id mentioned in params. He can also add an image to be saved to the uploads folder, with the use of the **multer** package.

- **POST** [/products/update-image/:id](https://restaurant-server.arisdb.myipservers.gr/products/update-image/:id) **:** The route to change the image of the product having the id in params, with the use of multer, and the image url that exists in the database. It also deletes the previous image from the uploads folder.

- **PUT** [/products/update-characteristics/:id](https://restaurant-server.arisdb.myipservers.gr/products/update-characteristics/:id) **:** The route to modify the attributes of the product having the id in params.

- **DELETE** [/products//delete-product/:id](https://restaurant-server.arisdb.myipservers.gr/products/delete-product/:id) **:**  The route to delete the product with the id in params, and also delete its photo from the uploads folder.

### Chat

- **GET** [/chat-messages](https://restaurant-server.arisdb.myipservers.gr/chat-messages) **:** Gets all the chat messages exchanged by the customers and the admin, with all other existing info, sorted by date in descending order.

- **GET** [/chat-messages/only-customers](https://restaurant-server.arisdb.myipservers.gr/chat-messages/only-customers) **:** Gets only the customers' messages to the admin, sorted by date in descending order.

- **GET** [/chat-messages/customers](https://restaurant-server.arisdb.myipservers.gr/chat-messages/customers) **:** Gets all the names of the customers that sent chat message to the admin. Also the date of the last message sent, and the amount of the unread messages as "Sum".

- **GET** [/chat-messages/unread-messages](https://restaurant-server.arisdb.myipservers.gr/chat-messages/unread-messages) **:** Gets the amount of all unread customers' messages.

- **GET** [/chat-messages/latest-message](https://restaurant-server.arisdb.myipservers.gr/chat-messages/latest-message) **:** Gets the latest message sent by each customer, and the date it was received.

- **POST** [/chat-messages](https://restaurant-server.arisdb.myipservers.gr/chat-messages) **:** The route to save the message and the sender's name to the database

- **PUT** [/chat-messages/mark-as-unread](https://restaurant-server.arisdb.myipservers.gr/chat-messages/mark-as-unread) **:**  The route to modify the "Read_status" of a message/messages from "read" to "unread".

- **DELETE** [/chat-messages/delete-conversation/:customer](https://restaurant-server.arisdb.myipservers.gr/chat-messages/delete-conversation/:customer) **:**  Deletes the entire conversation with the admin and the customer in params.

- **DELETE** [/chat-messages/delete-selected/:customer](https://restaurant-server.arisdb.myipservers.gr/chat-messages/delete-selected/:customer) **:**  Deletes the conversations with the customers mentioned in params. the customers are separated with a hyphen(-), and we convert the params string to an array of the customers mentioned.

### Customers

- **GET** [/customers/customers-info](https://restaurant-server.arisdb.myipservers.gr/customers/customers-info) **:** Gets all customers' information.

- **GET** [/customers/customer-by-:email](https://restaurant-server.arisdb.myipservers.gr/customers/customer-by-johnnie.walker@gmail.com) **:**  Gets the info of the customer with the email in params.

### Orders

- **GET** [/orders](https://restaurant-server.arisdb.myipservers.gr/orders) **:** Gets the customer's name and the checked status of every single order made, sorted by date in descending order.

- **GET** [/orders/latest-order-id](https://restaurant-server.arisdb.myipservers.gr/orders/latest-order-id) **:** Gets the id of the latest order made.

- **GET** [/orders/latest-order-id-of-:mail](https://restaurant-server.arisdb.myipservers.gr/orders/latest-order-id-of-:mail) **:** Gets the link of the latest invoice that has been generated for the customer that has the email of the url params.

- **GET** [/orders/orders-by-id](https://restaurant-server.arisdb.myipservers.gr/orders/orders-by-id) **:** This route sends 10 orders depending on the numbers of group chose by the user in req.body.

- **GET** [/orders/orders-amount](https://restaurant-server.arisdb.myipservers.gr/orders/orders-amount) **:** Gets the total amount of orders divided by 10. It is useful in the Admin Dashboard in order to show every time maximum 10 orders.

- **GET** [/orders/order-with-id-:id](https://restaurant-server.arisdb.myipservers.gr/orders/order-with-id-23) **:** Gets the order with the id requestes in route params.

- **GET** [/orders/price-of-:id](https://restaurant-server.arisdb.myipservers.gr/orders/price-of-32) **:** Gets the total price of the order that has the same id as the one in route params.

- **POST** [/orders/new-order](https://restaurant-server.arisdb.myipservers.gr/orders/new-order) **:** The route that a client can post a new order and save it to the database. It also generates instantly a pdf invoice with the use of the **PDFkit** library.

- **GET** [/orders/unchecked-orders](https://restaurant-server.arisdb.myipservers.gr/orders/unchecked-orders) **:** Gets the amount of all the unchecked orders.

### Nodemailer

- **POST** [/email/customer-form](https://restaurant-server.arisdb.myipservers.gr/email/customer-form) **:** To this route, a client posts the contact form of the Food Order App. Then, with the of the **NodeMailer** module, the server sends the contact form data to my email.

### Notifications

- **GET** [/notifications/customers-info](https://restaurant-server.arisdb.myipservers.gr/notifications/customers-info) **:** Gets the Admin Dashboard notifications, by using Sql Union to the "chat messages" and "orders" tables, and then sort them by Date in descending order.

### Statistics

- **GET** [/statistics/daily-income](https://restaurant-server.arisdb.myipservers.gr/statistics/daily-income) **:** Gets the total daily income.

- **GET** [/statistics/weekly-income](https://restaurant-server.arisdb.myipservers.gr/statistics/weekly-income) **:** Gets an array of the daily income of the last 7 days, and the name of each day.

- **GET** [/statistics/total-orders-amount](https://restaurant-server.arisdb.myipservers.gr/statistics/total-orders-amount) **:** Gets the total amount of orders made so far.

- **GET** [/statistics/total-customers-amount](https://restaurant-server.arisdb.myipservers.gr/statistics/total-customers-amount) **:** Gets the amount of the registered customers.

- **GET** [/statistics/total-revenue](https://restaurant-server.arisdb.myipservers.gr/statistics/total-revenue) **:** Gets the total revenue so far.

- **GET** [/statistics/trending-orders](https://restaurant-server.arisdb.myipservers.gr/statistics/trending-orders) **:** Gets the attributes of the 5 dishes that have been ordered the most times.

## MVC pattern

&nbsp;&nbsp;&nbsp;&nbsp;This app has many lines of code, so I had to 
split the routes into separate files. But those files where still quite
big, so I made use of the ***MVC*** architectural pattern.\
&nbsp;&nbsp;&nbsp;&nbsp;This pattern is consisted of controllers, models and views.
The [controllers](https://github.com/Aris-Empanta/Food_Order_App---Server/tree/main/controlers) 
contain the logic of each endpoint task, like functions, algorithms, etc.
The [models](https://github.com/Aris-Empanta/Food_Order_App---Server/tree/main/models) 
contain all the MySql queries needed to interact with the database. Those 2 with
the routes combined, can carry out the task required of each endpoint.\
&nbsp;&nbsp;&nbsp;&nbsp;The **views** for this app are not some template engine
files, but instead the 2 React app who interact with this server, the 
[Food order app](https://courageous-frangipane-c90c9e.netlify.app/) and the
[Admin Dashboard](https://6378372e9d407f764d34917b--subtle-nasturtium-5d32c7.netlify.app/).

## Socket.io

&nbsp;&nbsp;&nbsp;&nbsp;In this app, for real time data transfer operations, we use the **Socket.io** library.
It is needed for the orders transfer and the chat messages. In this [file](https://github.com/Aris-Empanta/Food_Order_App---Server/blob/main/socket_io/socket_io.js)
 you can cleary see all the events that the server listens to and the handling of the payload.\
 &nbsp;&nbsp;&nbsp;&nbsp;Once the server listens to an event, it might proccess
 the receiving payload and emit a new event, or even save the payload 
 directly to the database through its [controllers](https://github.com/Aris-Empanta/Food_Order_App---Server/blob/main/controlers/socketController.js)
 and [models](https://github.com/Aris-Empanta/Food_Order_App---Server/blob/main/models/socketModel.js) .