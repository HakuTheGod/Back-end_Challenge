/*Returning a function for express and storing it in a variable*/
const express = require('express');

const path = require('path');

const mongoose = require('mongoose');

const openapi_validator = require('express-openapi-validator');

const apiSpec = path.join(__dirname, 'definition.yaml');

/* Returning the router function and storing it in a variable.*/
const routes = require('./routes/router');

/*Connect to mongoDB */
const DBUri = 'mongodb+srv://nikolakovatsevits:AjkPGNCfS3bGBsbJ@conveos-challeneg-clust.nsssms7.mongodb.net/Conveos-Challenge-DB?retryWrites=true&w=majority'

/*Establish a connection to the database using the above URI and after you complete the connection start
listening for requests. */
mongoose.connect(DBUri)
    .then((result) => app.listen(4000, () => {  console.log("Listening on port 4000");  }))
    .catch((err) => console.log(err))

/*Using the function to create the server*/
const app = express();

app.use(
    openapi_validator.middleware({
        apiSpec: apiSpec,
        validateRequests: true,
        validateResponses: true
    }),
);

app.use(routes);



app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors
    });
});




