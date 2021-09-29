const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Attempts_QuizSchema = new Schema({
    Student: {
        type : Schema.Types.ObjectId,
        ref:'student',
        required: true
    },
    Subject: {
        type : Schema.Types.ObjectId,
        ref:'subject',
        required: true
    },
    Quiz: {
        type : Schema.Types.ObjectId,
        ref:'quiz',
        required: true
    },
    AttemptDate: {
        type : Date,
        required: true
    }
})

const Attempts_Quiz = mongoose.model("Attempts_Quiz",Attempts_QuizSchema);

module.exports = Attempts_Quiz;