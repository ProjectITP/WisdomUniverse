const mongoose=require(`mongoose`);
const enrollKeySchema= new mongoose.Schema({
    
       subject_name : {

        type : String,
        required : true
    },

    enrollment_key : {

        type : String,
        required : true
    }


});

module.exports = mongoose.model(`EnrollKey`, enrollKeySchema)