const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Attempts_AssSchema = new Schema({
    Student:{
        type : String,
        required: true
    },
    Subject:{
        type : String
    },
    Instructor:{
        type : String,
        default:''
    },
    Assignment:{
        type : String,
        required: true
    },
    AttemptDate:{
        type : Date,
        required: true
    },
    MarkingStatus:{
        type : String,
        required: true,
        default:'false'
    },
    PublicationStatus: {
        type : String,
        required: true,
        default:'false'
    },
    PlagarismStatus:{
        type : String,
        required: true,
        default:'false'
    },
    PlagarismScore: {
        type : Number,
        required: true,
        default:0
    },
    Marks: {
        type : Number,
        required: true,
        default:0
    },
    Grade: {
        type : String,
        required: true,
        default:'F'
    },
    Status: {
        type : String,
        required: true,
        default:'Fail'
    },
    RescrutinyRequest: {
        type : String,
        required: true,
        default:'false'
    },
    RescrutinyNotification: {
        type : String,
        required: true,
        default:'false'
    },
    PublishStatus: {
        type : String,
        required: true,
        default:'false'
    },
    Subfile:{
        type: String,
        default:""
    }
})

const Attempts_Ass = mongoose.model("Attempts_Ass",Attempts_AssSchema);

module.exports = Attempts_Ass;