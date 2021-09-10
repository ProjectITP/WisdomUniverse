const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AssignmentResultSchema = new Schema({
    Mark: {
        type : Number,
        required: true
    },
    Grade: {
        type : String,
        required: true
    },
    Status: {
        type : String,
        required: true
    },
    RescrutinyRequest: {
        type : String,
        required: true
    },
    RescrutinyNotification: {
        type : Boolean,
        required: true
    },
    PublishStatus: {
        type : Boolean,
        required: true
    }
})

const AssignmentResult = mongoose.model("AssignmentResult",AssignmentResultSchema);

module.exports = AssignmentResult;