const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({

    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    nic:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneno:{
        type:String,
        required:true
    },
    hequalification:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    }
    
});


module.exports = mongoose.model('Instructors',instructorSchema);