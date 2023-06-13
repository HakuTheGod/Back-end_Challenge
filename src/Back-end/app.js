/*Returns a function for express and stores it in a variable*/
const express = require('express');

/*Returns a function that have functionalities on file paths and stores it in a variable*/
const path = require('path');

/*Returns a function that can connect us with the database and stores it in a variable*/
const mongoose = require('mongoose');

const cookie_parser = require('cookie-parser'); 

/*Returns the validator function that has the middleware and stores it in a variable */
const openapi_validator = require('express-openapi-validator');


/*Returns the path to the views folder and stores it in a variable*/
const ejs = path.join(__dirname, 'views');

/*Returns the path to the .yaml file and stores it in a variable*/
const apiSpec = path.join(__dirname, 'definition.yaml');

/* Returns the router function and stores it in a variable.*/
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

/*Sets up the views path */
app.set('views', path.join(__dirname, 'views'));

/*Sets up the view engine */
app.set('view engine', 'ejs');

/*Allows the program to parse json files and puts the data in req.body */
app.use(express.json());

/*Use the middleware of the openAPI validator to validate the openAPI definition of our API */
app.use(
    openapi_validator.middleware({
        apiSpec: apiSpec,
        validateRequests: true,
        validateResponses: true
    }),
);

/*Parses the cookies so we can validate the jwt keys */
app.use(cookie_parser());


/*Does the routing */
app.use(routes);


/*Catch any error that occurs */
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors
    });
});




