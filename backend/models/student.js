const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  feesPaid: {
    type: Number,
    required: true,
  },
  assignedClass: {
    type: String,
    required: true,
  },
  refUserID: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Student", studentSchema);
