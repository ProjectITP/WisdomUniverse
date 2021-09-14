const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({

    sname :{
        type : String,
        required: true
    },
    section:{
        type : String,
        required: true
    },
    review:{
        type : String,
        required : true
   },
    fdate :{
        type : Date,
        required:true

    },
    
    experience :{
        type : String,
        required:true

    },
    support :{
        type : String,
        required:true

    },
    satisfication :{
        type : String,
        required:true

    }

})

const Feedback = mongoose.model("Feedback",feedbackSchema);

module.exports = Feedback;