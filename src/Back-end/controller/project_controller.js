const User = require('../model/user');

/*Respond back to the client with HELLO WORLD */
const page_index = (req, res) => {
    res.send('HELLO WORLD');
}

/*Find the user that matches the id, throw 404 message if there is no match */
const find_user = (req, res) => {
    const id = req.params.id;
    User.findById(id)
        .then((result) => {
            if(result){
                res.send(result)
            }
            else{
                res.redirect('/404')
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

/*Add a new user to the database */
const add_user = (req, res) => {
    const user = new User(JSON.parse(req.params.user));
    user.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => console.log(err))
}

/*Update an existing user in the database with new values, throw 404 message if there is no match*/
const update_user = (req, res) => {
    const user = JSON.parse(req.params.user);
    const id = req.params.id;
    User.findByIdAndUpdate(id, user, {new: true})
    .then((result) => {
        if(result){
            res.send(result)
        }
        else{
            res.redirect('/404')
        }
    })
    .catch((err) => {
        console.log(err);
    })
}

/*Delete an existing user from the database, throw 404 message if there is no match*/
const delete_user = (req, res) => {
    const id = req.params.id;
    User.findByIdAndDelete(id)
        .then((result) => {
            if(result){
                res.send(result)
            }
            else{
                res.redirect('/404')
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

/* Message for 404 status error */
const error_404 = (req, res) => {
    res.send('OOPS COULD NOT FIND THE USER.');
}

module.exports = {
    page_index,
    find_user,
    add_user,
    update_user,
    delete_user,
    error_404
}