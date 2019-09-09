let mongoose = require('mongoose');
let taskSchema = mongoose.Schema({
    name: String,
    assign: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Developers'
    },
    due: Date,
    status: {
        type: String,
        validate: {
            validator: function (value) {
                if (value === 'InProgress' || value === 'Complete') {
                    return true;
                } else {
                    return false;
                }
            },
            message: 'Incorrect value!!!'
        }
    },
    desc: String
});

let taskModel = mongoose.model('Tasks', taskSchema);
module.exports = taskModel;