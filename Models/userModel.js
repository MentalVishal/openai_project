const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    email: String,
    name: String,
    password: String,
  },
  { versionKey: false }
);

const userModel = mongoose.model("User", userSchema);

module.exports = { userModel };
