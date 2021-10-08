const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assignmentSchema = new Schema({

    name:{
        type: String,
        required: true
    },
    subject:{
        type : String,
        required: true
    },
    instructor:{
        type : String,
        required: true
    },
    FromDate:{
        type: Date,
        required: true
    },
    ToDate:{
        type: Date,
        required: true
    }
})

const Assignment = mongoose.model("assignment",assignmentSchema);
module.exports = Assignment;