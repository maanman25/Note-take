// Required constants to access express and the routes index page
const express = require('express');
// Port for server
const PORT = process.env.PORT || 3001;
const routes = require('./routes');
// init express
const app = express();

// Declaring middleware for express
app.use(express.json());
// Middleware for urlencoded data
app.use(express.urlencoded({ extended: true }));
// using public folder as a starting place for the url params
app.use(express.static('public'));
// using 'routes' folder to point to routes the server can use
app.use(routes);
// Listening for incomming connections on specified port
app.listen(PORT, () => {
    console.log(`Example app listening http://localhost:${PORT}`);
});

