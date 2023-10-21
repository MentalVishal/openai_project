const mongoose = require("mongoose");

//History Schema
const historySchema = mongoose.Schema(
  {
    body: String,
    userID: String,
    date: String,
  },
  {
    versionKey: false,
  }
);

const historyModel = mongoose.model("History", historySchema);

module.exports = { historyModel };
