const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

/*Creating user Schema and model*/
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters']
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

/*Uses the bcrypt library to hash the user's password for protection. */
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

/*Uses the bcrypt library to validate the user's credentials so he can login */
userSchema.statics.login = async function(name, password) {
    const user = await this.findOne({ name });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        console.log("auth");
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect username');
};

const User = mongoose.model('user', userSchema);

module.exports = User;