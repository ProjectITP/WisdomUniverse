const mongoose = require("mongoose");
const Schema = mongoose.Schema;
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
        required: true
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

const Quiz = mongoose.model("quiz",quizSchema);
module.exports = Quiz;