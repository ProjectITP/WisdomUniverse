const mongoose=require(`mongoose`);
const enrollSchema= new mongoose.Schema({
    
    student_id : {

        type : String,
        required : true
    },
    
    subject_id : {

        type : String,
        required : true
    },

    month : {

        type : String,
        required : true
    }


});

module.exports = mongoose.model(`Enroll`, enrollSchema)