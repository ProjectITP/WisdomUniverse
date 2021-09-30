const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contactusSchema = new Schema({

    name :{
        type : String,
        required: true
    },
    email:{
        type : String,
        required: true
    },
    phone :{
        type : Number,
        required:true

    },
    question:{
        type : String,
        required: true
    }
})

const Contactus = mongoose.model("Contactus",contactusSchema);

module.exports = Contactus;