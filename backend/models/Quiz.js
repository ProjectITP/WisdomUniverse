const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDateFormat = require('mongoose-date-format');
const quizSchema = new Schema({

    name:{
        type: String,
        required: true
    },
    duration:{
        type: Number,
        required: true
    },
    FromDate:{
        type: Date,
        required: true,
        format: "%Y-%m-%d"
    },
    ToDate:{
        type: Date,
        required: true
    },
    Attempts:{
        type: Number,
        required: true
    }
    
})

quizSchema.plugin(mongooseDateFormat);  // format: YYYY-MM-DD HH:mm:ss

const Quiz = mongoose.model("quiz",quizSchema);
module.exports = Quiz;