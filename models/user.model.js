const { Schema, model, plugin } = require("mongoose");
const muv = require("mongoose-unique-validator");

const userSchema = Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

plugin(muv);

module.exports = model("user", userSchema);
