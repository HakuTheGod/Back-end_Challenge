const User = require('../model/user');

/*Respond back to the client with HELLO WORLD */
const page_index = (req, res) => {
    res.status(200)
    res.set('content-type', 'text/plain')
    res.send('HELLO WORLD');
}

/*Find the user that matches the id, throw 404 message if there is no match */
const find_user = (req, res) => {
    const id = req.params.id;
    User.findById(id)
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

/*Add a new user to the database */
const add_user = (req, res) => {
    const user = new User(JSON.parse(req.params.user));
    user.save()
        .then((result) => {
            res.status(200)
            res.set('content-type', 'application/json')
            res.send(JSON.stringify(result))
        })
        .catch((err) => {
            console.log(err)
            res.redirect('/400')
        })
}

/*Update an existing user in the database with new values, throw 404 message if there is no match*/
const update_user = (req, res) => {
    const user = JSON.parse(req.params.user);
    const id = req.params.id;
    User.findByIdAndUpdate(id, user, {new: true})
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
    const id = req.params.id;
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
    find_user,
    add_user,
    update_user,
    delete_user,
    error_404,
    error_400
}