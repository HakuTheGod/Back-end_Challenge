const express = require('express');

const controller = require('../controller/project_controller');
const jwt = require('jsonwebtoken');

const router = express.Router();

/*Handles the authentication of the user's JWT token */
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;


  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'Secret Lorem Secret', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/log_in');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/log_in');
  }
};


/*Respond with HELLO WORLD every time someone starts the server and navigates to localhost:3000.*/
router.get('/', controller.page_index);

/*Calls the rendering function for the signup page */
router.get('/sign_up', controller.sign_up_get);

/*Calls the function for creating and adding a new user entry to the database*/
router.post('/sign_up', controller.add_user);

/*Calls the rendering function for the login page */
router.get('/log_in', controller.log_in_get);

/*Calls the validation function for the user login*/
router.post('/log_in', controller.log_in_post);

/*The function searches the database for a user with a specific ID 
    and returns it's details to the client.*/
router.get('/getUser', requireAuth, controller.find_user);

/*This function takes a collection of the user details in the form of
    {"name":"The user's name", "email":"the user's email", "phone":"the user's phone number"}
    and created a database entry with a unique id and the details passed as the parameter.
    The function returns the details of the database entry that was just created to the client.*/
router.post('/postUser', requireAuth, controller.add_user);

/*Searches for the user with the same ID as the one given in parameter and
    updates the values of name, email and phone.
    The function returns the details of the database entry after they have been updated to the client*/
router.put('/putUser', requireAuth, controller.update_user);

/*Searches in the database for the user with the specific ID that is given as parameter, and when 
    it finds him it deletes his entry from the database and returns the details of the 
    deleted entry to the client.*/
router.delete('/deleteUser', requireAuth, controller.delete_user);

/*Throw error message if user does not exist*/
router.get('/404', controller.error_404)

/*Throw error message if bad request*/
router.get('/400', controller.error_400)

module.exports = router;