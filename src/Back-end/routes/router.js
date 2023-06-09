const express = require('express');

const controller = require('../controller/project_controller');

const router = express.Router();


/*Respond with HELLO WORLD every time someone starts the server and navigates to localhost:3000.*/
router.get('/', controller.page_index);

/*The function searches the database for a user with a specific ID 
    and returns it's details to the client.*/
router.get('/get/:id', controller.find_user);

/*This function takes a collection of the user details in the form of
    {"name":"The user's name", "email":"the user's email", "phone":"the user's phone number"}
    and created a database entry with a unique id and the details passed as the parameter.
    The function returns the details of the database entry that was just created to the client.*/
router.post('/post/:user', controller.add_user);

/*Searches for the user with the same ID as the one given in parameter and
    updates the values of name, email and phone.
    The function returns the details of the database entry after they have been updated to the client*/
router.put('/put/:id/:user', controller.update_user);

/*Searches in the database for the user with the specific ID that is given as parameter, and when 
    it finds him it deletes his entry from the database and returns the details of the 
    deleted entry to the client.*/
router.delete('/delete/:id', controller.delete_user);

/*Throw error message if user does not exist*/
router.get('/404', controller.error_404)

module.exports = router;