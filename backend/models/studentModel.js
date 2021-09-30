const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter your first name"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Please enter your last name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      trim: true,
      unique: true,
    },
    nic: {
      type: String,
      required: [true, "Please enter your NIC"],
      unique: true,
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Please enter your address"],
    },
    phone: {
      type: String,
      required: [true, "Please enter your phone number"],
    },
    gender: {
      type: String,
      required: [true, "Please enter your gender"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
    },
    thumbnail: {
      type: String,
      default:
        "https://res.cloudinary.com/dhdg4uhps/image/upload/v1631079559/samples/60111_yvondx.jpg",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Students", studentSchema);
