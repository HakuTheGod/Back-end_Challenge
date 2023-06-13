const User = require('../model/user');
const jwt = require('jsonwebtoken');

/*3 days in seconds */
const maxAge = 20 * 24 * 60 * 60;
/*Creating JWT that is valid for 20 days */
const createToken = (id) => {
    return jwt.sign({id}, 'Secret Lorem Secret', {
        expiresIn: maxAge
    });
}

/*Respond back to the client with HELLO WORLD */
const page_index = (req, res) => {
    res.status(200)
    res.set('content-type', 'text/plain')
    res.send('HELLO WORLD');
}

/*Renders the signup page */
const sign_up_get = (req, res) => {
    res.render('sign_up');
}
/*Renders the login page */
const log_in_get = (req, res) => {
    res.render('log_in');
}


/*Find the user that matches the id, throw 404 message if there is no match */
const find_user = (req, res) => {
    const id = req.body.id;
    User.findById(id)
        .then((result) => {
            if(result){
                res.status(200)
                res.set('content-type', 'application/json')
                res.send(JSON.stringify(result._id))
            }
            else{
                res.redirect('/404')
            }
        })
        .catch((err) => {
            console.log(err)
            res.redirect('/400')
        })
}

/*Validates the login credentials of the user and if the validation is successful, it creates a jwt token 
for validation between protected routes */
const log_in_post = async (req, res) => {
    const { name, password } = req.body;
  
    try {
      const user = await User.login(name, password);
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({ user: user._id });
    } 
    catch (err) {
      res.status(400).json({ err });
    }
  
  }

/*Add a new user to the database */
const add_user = (req, res) => {
    const userData = req.body;
    console.log(userData);
    const user = new User(userData);
    console.log(user);
    user.save()
        .then((result) => {
            res.status(200)
            res.set('content-type', 'application/json')
            res.send(JSON.stringify(result._id))
        })
        .catch((err) => {
            console.log(err)
            res.redirect('/400')
        })
}

/*Update an existing user in the database with new values, throw 404 message if there is no match*/
const update_user = (req, res) => {
    const userData = req.body;
    const id = req.body.id;
    User.findByIdAndUpdate(id, userData, {new: true})
    .then((result) => {
        if(result){
            res.status(200)
            res.set('content-type', 'application/json')
            res.send(JSON.stringify(result))
        }
        else{
            res.redirect('/404')
        }
    })
    .catch((err) => {
        console.log(err)
        res.redirect('/400')
    })
}

/*Delete an existing user from the database, throw 404 message if there is no match*/
const delete_user = (req, res) => {
    const id = req.body.id;
    User.findByIdAndDelete(id)
        .then((result) => {
            if(result){
                res.status(200)
                res.set('content-type', 'application/json')
                res.send(JSON.stringify(result))
            }
            else{
                res.redirect('/404')
            }
        })
        .catch((err) => {
            console.log(err)
            res.redirect('/400')
        })
}

/* Message for 404 status error */
const error_404 = (req, res) => {
    res.status(404)
    res.set('content-type', 'text/plain')
    res.send('OOPS COULD NOT FIND THE USER.')
}

/* Message for 400 status error */
const error_400 = (req, res) => {
    res.status(400)
    res.set('content-type', 'text/plain')
    res.send('OOPS SOMETHING WENT WRONG.')
}

module.exports = {
    page_index,
    sign_up_get,
    log_in_get,
    log_in_post,
    find_user,
    add_user,
    update_user,
    delete_user,
    error_404,
    error_400
}