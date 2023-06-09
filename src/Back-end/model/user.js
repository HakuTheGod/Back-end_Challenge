const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*Creating user Schema and model*/
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    email: {
        type: String,
        required: [true, 'Email field is required']
    },
    phone: {
        type: String,
        required: [false]
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User;