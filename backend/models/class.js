const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  className: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  teacher: {
    type: String,
    required: true,
  },
  studentFees: {
    type: Number,
    required: true,
  },
  studentList: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Class", classSchema);
