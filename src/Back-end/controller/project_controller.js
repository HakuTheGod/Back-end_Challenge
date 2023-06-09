const User = require('../model/user');

/*Respond back to the client with HELLO WORLD */
const page_index = (req, res) => {
    res.send('HELLO WORLD');
}

/*Find the user that matches the id */
const find_user = (req, res) => {
    const id = req.params.id;
    User.findById(id)
        .then((result) => {
            res.send(result)
        })
        .catch((err) => console.log(err))
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

/*Update an existing user in the database with new values*/
const update_user = (req, res) => {
    const user = new User(JSON.parse(req.params.user));
    const id = user.params.id;
    User.findByIdAndUpdate(id, user)
        .then((result) => {
            res.send(result)
        })
        .catch((err) => console.log(err))
}

/*Delete an existing user from the database*/
const delete_user = (req, res) => {
    const id = req.params.id;
    var err = 1;
    /*Find user and delete him*/
    for(let i = 0; i < users.length; i++){
            if(users[i].id === id){
                err = 0;
                users.splice(i, 1);
            }
    }
    /*IF user does not exist redirect*/
    if(err === 1){
        res.redirect('/404');
    }
    res.send(users);
}

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