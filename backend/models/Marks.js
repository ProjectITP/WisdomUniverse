const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MarksSchema = new Schema({
    Student:{
        type : String,
        required: true
    },
    Maths:{
        type : Number
    },
    Chemistry:{
        type : Number
    },
    Physics:{
        type : Number
    },
    Total:{
        type: Number
    },
    Average:{
        type: Number
    },
    Grade:{
        type: String
    },
    Status:{
        type: String
    }
})

const Marks = mongoose.model("Marks",MarksSchema);

module.exports = Marks;