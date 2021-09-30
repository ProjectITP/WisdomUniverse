const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AssignmentResultSchema = new Schema({
    Student:{
        type : Schema.Types.ObjectId,
        ref:'student',
        required: true
    },
    Subject:{
        type : Schema.Types.ObjectId,
        ref:'subject',
        required: true
    },
    Instructor:{
        type : Schema.Types.ObjectId,
        ref:'instructor',
        required: true,
        default:''
    },
    Assignment:{
        type : Schema.Types.ObjectId,
        ref:'quiz',
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
        type : Boolean,
        required: true,
        default:'false'
    },
    PlagarismStatus:{
        type : Boolean,
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
        required: true
    },
    Grade: {
        type : String,
        required: true
    },
    Status: {
        type : String,
        required: true
    },
    RescrutinyRequest: {
        type : String,
        required: true
    },
    RescrutinyNotification: {
        type : Boolean,
        required: true
    },
    PublishStatus: {
        type : Boolean,
        required: true
    }
})

const AssignmentResult = mongoose.model("AssignmentResult",AssignmentResultSchema);

module.exports = AssignmentResult;