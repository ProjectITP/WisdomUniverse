const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDateFormat = require('mongoose-date-format');
const assignmentSchema = new Schema({

    name:{
        type: String,
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

assignmentSchema.plugin(mongooseDateFormat);

const Assignment= mongoose.model("assignment",assignmentSchema);
module.exports = Assignment;