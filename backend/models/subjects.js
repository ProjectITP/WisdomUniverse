const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    subjectName:{
        type:String,
        required:true
    },
    instructorName:{
        type:String,
        required:true
    },
    contNumber:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:false
    },
    startDate:{
        type:Date,
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    shedule:{
        type:String,
        required:true
    },
    fee:{
        type:String,
        required:false
    },
    aboutClass:{
        type:String,
        required:true
    },
});

module.exports = mongoose.model('Subjects',subjectSchema);


