const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

//for register
const BloodRequestSchema = new mongoose.Schema({
  blood_group: {
    type: String,
    required: true,
  },
  pin_code: {
    type: String,
    required: true,
  },
  expiry_date: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    default: "",
  },
  acceptorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserRegistration",
    default: null,
  },
  status: {
    type: Boolean,
    default: false,
  },
  acceptDate: {
    type: Date,
    default: null,
  },
});

const BloodRequest = mongoose.model("BloodRequest", BloodRequestSchema);
module.exports = BloodRequest;
