/*Returning a function for express and storing it in a variable*/
const express = require('express');

/* Returning the router function and storing it in a variable.*/
const routes = require('./routes/router');

/*Using the function to create the server*/
const app = express();

app.use(routes);

/*Listening for requests on port 3000 under default address localhost */
app.listen(4000, () => {
    console.log("Listening on port 4000");
});


