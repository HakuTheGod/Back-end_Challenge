var currID = 1;
const users = [{
    id: `${currID}`,
    name: "Nikola",
    email: "something@gmail.com",
    phone: '6937918921'
}];

/*Respond back to the client with HELLO WORLD */
const page_index = (req, res) => {
    res.send('HELLO WORLD');
}

/*Find the user that matches the id */
const find_user = (req, res) => {
    const id = req.params.id;
    var err = 1;
    /*Find user and return him*/
    for(let i = 0; i < users.length; i++){
            if(id === users[i].id){
                    err = 0;
                    res.send(users[i]);
            }
    }
    /*IF user does not exist redirect*/
    if(err === 1){
        res.redirect('/404');
    }
}

/*Add a new user to the database */
const add_user = (req, res) => {
    currID++;
    const newUser = {
        id: `${currID}`,
        name: "George",
        email: "newEmail@gmail.com",
        phone: '6994352622'
    };
    users.push(newUser);
    res.send(users);
}

/*Update an existing user in the database with new values*/
const update_user = (req, res) => {
    var err = 1;
    const id = req.params.id;
    const username = req.params.username;
    const email = req.params.email;
    const phone = req.params.phone;
    /*Find user and update him*/
    for(let i = 0; i < users.length; i++){
        if(users[i].id === id){
            err = 0;
            users[i].name = username;
            users[i].email = email;
            users[i].phone = phone;
        }
    }
    /*IF user does not exist redirect*/
    if(err === 1){
        res.redirect('/404');
    }
    res.send(users);
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