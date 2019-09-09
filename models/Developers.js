let mongoose = require('mongoose');
let developerSchema = mongoose.Schema({
    name: {
        firstName: {
            type: String,
            required: true
        },
        lastName: String
    },
    level: {
        type: String,
        validate: {
            validator: function (value) {
                if (value === 'BEGINNER' || value === 'EXPERT') {
                    return true;
                } else {
                    return false;
                }
            },
            message: 'Incorrect value!!!'
        },
        required: true
    },
    address: {
        state: String,
        suburb: String,
        street: String,
        unit: String
    }
});

let developerModel = mongoose.model('Developers', developerSchema);
module.exports = developerModel;