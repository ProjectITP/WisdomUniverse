const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const assessmentSchema = new Schema({

    name:{
        type: String,
        required: true
    }
    
})

const Assessment = mongoose.model("assessment",assessmentSchema);
module.exports = Assessment;