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