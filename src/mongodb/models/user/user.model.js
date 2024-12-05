const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

const UserModel = model('user', userSchema);
module.exports = {
    UserModel
};