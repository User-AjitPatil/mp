const mongoose = require('mongoose');

const admin_Schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    Mobile_NO: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^\+?[1-9]\d{1,14}$/.test(v); // Basic regex for mobile number
            },
            message: props => `${props.value} is not a valid mobile number!`
        }
    }
});


module.exports = mongoose.model('admin', admin_Schema);