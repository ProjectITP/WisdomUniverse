const mongoose =  require('mongoose'); //import mongoose package

const Schema = mongoose.Schema;

const paymentSchema = new Schema({

    name : {
        type : String,
        required : true
    },

    nic : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true
    },
    subject : {
        type : String,
        required : true
    },


    bank : {
        type : String,
        required : true
    },

    amount : {
        type : String,
        required : true
    },

    deposited_date : {
        type : String,
        required : true
    },

    file_path : {
        type : String,
        required : true
    },

    file_mimetype : {
        type : String,
        required : true
    }
    
    

})

const Payment = mongoose.model("Payment",paymentSchema);


module.exports = Payment; //export module