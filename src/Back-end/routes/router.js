const express = require('express');

const controller = require('../controller/project_controller');

const router = express.Router();


/*Respond with HELLO WORLD every time someone starts the server and navigates to localhost:3000.*/
router.get('/', controller.page_index);

/*The function searches for a user with a specific ID and returns him to the client.*/
router.get('/get/:id', controller.find_user);

/*Creates a new user with a different ID than the others and adds him to the database.
The function returns the list of the current users.*/
router.post('/post/:user', controller.add_user);

/*Searches for the user with the same ID as the one given in parameter and
 updates the values of name, email and phone.*/
router.put('/put/:id/:username/:email/:phone', controller.update_user);

/*Searches for the user with the specific ID given as parameter and when 
it finds him it deletes him and prints the other users in the database .*/
router.delete('/delete/:id', controller.delete_user);

/*Throw error message if user does not exist*/
router.get('/404', controller.error_404)

module.exports = router;