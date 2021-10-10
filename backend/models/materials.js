const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
      subjectName:{
        type:String,
        required:true,
        trim: true
      },
      topic: {
        type: String,
        required: true,
        trim: true
      },
      notes: {
        type: String,
        required: false,
        trim: true
      },
      material_path: {
        type: String,
        required: true
      },
      material_mimetype: {
        type: String,
        required: true
      }
    },
    {
      timestamps: true
    }
);
const Material = mongoose.model('Material', materialSchema);
module.exports = Material;