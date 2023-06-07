/*Returning a function for express and storing it in a variable*/
const express = require('express');

/*Using the function to create the server*/
const app = express();

/*Listening for requests on port 3000 under default address localhost */
app.listen(3000);

/*Respond with HELLO WORLD every time someone starts the server and navigates to localhost:3000.*/

app.get('/', (req, res) => {
    res.send('<h1> HELLO WORLD </h1>');
});