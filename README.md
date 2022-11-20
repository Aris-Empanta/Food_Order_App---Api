## Food Order App - Server 

&nbsp;&nbsp;&nbsp;&nbsp;This is the server used by the 
[Food order app](https://courageous-frangipane-c90c9e.netlify.app/) and its
[Admin Dashboard](https://6378372e9d407f764d34917b--subtle-nasturtium-5d32c7.netlify.app/).
It contains all the backend logic for their CRUD operations, real time data transfer,
mail sending etc.

## Summary
&nbsp;&nbsp;&nbsp;&nbsp;A monolithic Node js server built in MVC architectural pattern 
(with views being the 2 React Apps mentioned above connected). It is connected
to an online MySql database, which holds all the data for the apps needed. 

&nbsp;&nbsp;&nbsp;&nbsp;The server contains 7 different Routes. Each of it will be 
described in further detail in the next sections. 

## Main Stack

- Node.js
- Express
- MySql
- Socket.io

## Routes
&nbsp;&nbsp;&nbsp;&nbsp;In order to make an HTTP request,
you have to combine the server's host url (
https://restaurant-server.arisdb.myipservers.gr/ ), with one of the paths
mentioned below, depending the task you want to carry out.

### Index

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

