const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const noticeSchema = new Schema({

    title :{
        type : String,
        required: true
    },

    notice :{
        type : String,
        required: true
    },
    uploader:{
        type : String,
        required: true
    },
    date :{
        type : Date,
        required:true

    }
})

const Notice = mongoose.model("Notice",noticeSchema);

module.exports = Notice;