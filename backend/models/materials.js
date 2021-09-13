const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
    subjectName:{
        type:String,
        required:true
    },
    /*curriculum:{
        type:String,
        required:false
    },
    timeTable:{
        type:String,
        required:false
    },*/
    topic:{
        type:String,
        required:true
    },
    notes:{
        type:String,
        required:false
    },
    additionalNotes:{
        type:String,
        required:false
    }
});

module.exports = mongoose.model('Materials',materialSchema);